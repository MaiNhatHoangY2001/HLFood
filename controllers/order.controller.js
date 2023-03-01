const Employee = require("../model/Employee.model");
const Order = require("../model/Order.model");
const Customer = require("../model/Customer.model");
const Table = require("../model/Table.model");
const Order_detail = require("../model/Order_detail.model");
const Food = require("../model/Food.model");
const schedule = require('node-schedule');


const orderController = {

    getOrder: async (req, res) => {
        try {
            const order = await Order.find(req.body).populate("tables order_details");

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
                emp.updateOne({ $push: { orders: saveOrder._id } });
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
                const tablesInput = req.body.bookingTable.split(",").map(Number);
                await Table.updateMany({ "table_num": { "$in": tablesInput } }, { $set: { order: saveOrder._id } });
    
                const tables = await Table.find({ "table_num": { "$in": tablesInput } })
                await Order.updateOne({ "_id": saveOrder._id }, { $set: { tables: tables } });
            }else {
                const timeBooking = new Date (req.body.time_booking)
            }
          

            res.status(200).json(saveOrder._id);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // Booking Food
    addOrderDetail: async (req, res) => {
        try {
            const newOrderDetail = new Order_detail(req.body);
            const saveOrder = await newOrderDetail.save();

            if (req.body.food) {
                const food = Food.findById(req.body.food);
                await food.updateOne({ $push: { order_details: saveOrder._id } });
            }

            if (req.body.order) {
                const order = Order.findById(req.body.order);
                await order.updateOne({ $push: { order_details: saveOrder._id } });
            }

            res.status(200).json(saveOrder);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // Booking Food
    addListOrderDetail: async (req, res) => {
        try {
            const orderDetails = req.body.orderDetails;
            orderDetails.forEach(async (orderDetail) => {
                const newOrderDetail = new Order_detail(orderDetail);
                const saveOrder = await newOrderDetail.save();

                const food = Food.findById(orderDetail.food);
                await food.updateOne({ $push: { order_details: saveOrder._id } });

                const order = Order.findById(orderDetail.order);
                await order.updateOne({ $push: { order_details: saveOrder._id } });
            })

            res.status(200).json("Add List Food Succesfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },

};

module.exports = orderController;
