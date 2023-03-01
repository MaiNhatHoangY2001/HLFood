const Employee = require("../model/Employee.model");
const Order = require("../model/Order.model");
const Customer = require("../model/Customer.model");
const Table = require("../model/Table.model");


const orderController = {
    //ADD ORDER
    addOrder: async (req, res) => {
        try {
            const newOrder = new Order(req.body);
            const saveOrder = await newOrder.save();

            if (req.body.employee) {
                const emp = Employee.findById(req.body.employee);
                emp.updateOne({ $push: { orders: saveOrder._id } });
            }


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

            //Modify table
            const tablesInput = req.body.bookingTable.split(",").map(Number);
            await Table.updateMany({ "table_num": { "$in": tablesInput } }, { $set: { order: saveOrder._id } });

            const tables = await Table.find({ "table_num": { "$in": tablesInput } })
            await Order.updateOne({ "_id": saveOrder._id }, { $set: { tables: tables } });

            res.status(200).json("Add successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = orderController;
