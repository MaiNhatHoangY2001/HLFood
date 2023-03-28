const Employee = require("../model/Employee.model");
const Order = require("../model/Order.model");
const Customer = require("../model/Customer.model");
const Table = require("../model/Table.model");
const Order_detail = require("../model/Order_detail.model");
const Food = require("../model/Food.model");
const History_Order = require("../model/History_Order.model");


const orderController = {

    getAllOrder: async (req, res) => {
        try {
            const orders = await Order.find();

            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getOrder: async (req, res) => {
        try {
            console.log(req.query.id);
            const order = await Order.findById(req.query.id).populate("tables order_details").populate({
                path: 'order_details',
                populate: { path: 'food' }
            });

            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //ADD ORDER
    addOrder: async (req, res) => {
        try {
            const newOrder = new Order(req.body);
            const saveOrder = await newOrder.save();

            if (req.body.employee) {
                const emp = Employee.findById(req.body.employee);
                await emp.updateOne({ $push: { orders: saveOrder._id } });
            }


            if (req.body.customerPhone) {
                //Add Customer or  Modify Customer
                const cus = await Customer.findOne({ phone_num: req.body.customerPhone });

                if (!cus) {
                    const newCus = new Customer({ name: req.body.customerName, phone_num: req.body.customerPhone, order: [saveOrder._id] });
                    const cusSave = await newCus.save();
                    //Save customer id in order
                    await Order.updateOne({ "_id": saveOrder._id }, { $set: { customer: cusSave._id } });
                }
                else {
                    //Save customer id in order and order id in customer
                    await Order.updateOne({ "_id": saveOrder._id }, { $set: { customer: cus._id } });
                    await Customer.updateOne({ "_id": cus._id }, { $push: { order: saveOrder._id } });
                }
            }

            //Modify table
            if (!req.body.time_booking) {
                bookingTable(req.body.bookingTable, saveOrder);
            } else {
                const timeBooking = new Date(req.body.time_booking)
                const reminderTime = new Date(timeBooking.getTime() - 60 * 60 * 1000);
                const delay = reminderTime.getTime() - Date.now()
                //schedule table when customer booking
                setTimeout(() => {
                    console.log("Running");
                    bookingTable(req.body.bookingTable, saveOrder);
                }, delay);
            }


            res.status(200).json({ orderId: saveOrder._id });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // Booking Food
    addListOrderDetail: async (req, res) => {
        try {
            const orderDetails = req.body.orderDetails;
            let idOrderDetails = [];

            for (const orderDetail of orderDetails) {
                const checkFood = await Order_detail.findOne({ food: orderDetail.food, order: orderDetail.order });
                if (checkFood) {
                    const orderDetailOld = Order_detail.findById(checkFood._id);
                    const food = await Food.findById(orderDetail.food);
                    const quantityNew = checkFood.quantity + orderDetail.quantity;
                    await orderDetailOld.updateOne({ $set: { quantity: quantityNew, total_detail_price: food.price * quantityNew } });

                    idOrderDetails = [...idOrderDetails, checkFood._id.toString()];
                } else {
                    const newOrderDetail = new Order_detail(orderDetail);
                    const saveOrder = await newOrderDetail.save();
                    const food = Food.findById(orderDetail.food);
                    await food.updateOne({ $push: { order_details: saveOrder._id } });
                    const order = Order.findById(orderDetail.order);
                    await order.updateOne({ $push: { order_details: saveOrder._id } });
                    idOrderDetails = [...idOrderDetails, newOrderDetail._id.toString()];
                }
            }

            //Add Histoty Order
            const newHistoryOrder = new History_Order({
                order_details: idOrderDetails,
                order: orderDetails[0].order
            })
            await newHistoryOrder.save();

            res.status(200).json("Add Food Succesfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },


};

async function bookingTable(bookingTable, saveOrder) {
    const tablesInput = bookingTable.split(",").map(Number);
    await Table.updateMany({ "table_num": { "$in": tablesInput } }, { $set: { order: saveOrder._id } });

    const tables = await Table.find({ "table_num": { "$in": tablesInput } })
    await Order.updateOne({ "_id": saveOrder._id }, { $set: { tables: tables } });
}

module.exports = orderController;
