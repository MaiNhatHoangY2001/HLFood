const Employee = require('../model/Employee.model');
const Order = require('../model/Order.model');
const Customer = require('../model/Customer.model');
const Table = require('../model/Table.model');
const CustomerModel = require('../model/Customer.model');

const orderController = {
	getAllOrder: async (req, res) => {
		try {
			const orders = await Order.find().populate('tables customer', "table_num status floor chair name phone_num");

			res.status(200).json(orders);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	getOrder: async (req, res) => {
		try {
			const order = await Order.findById(req.query.id)
				.populate('tables order_details customer')
				.populate({
					path: 'order_details',
					populate: { path: 'food' },
				});

			res.status(200).json(order);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	payOrder: async (req, res) => {
		try {
			const order = await Order.findById(req.query.id);
			await order.updateOne({ $set: { is_pay: true, exchange_price: req.body.exchange_price, cus_give_price: req.body.cus_give_price } });

			//Remove order in table
			for (const id of order?.tables) {
				await Table.updateOne({ _id: id }, { $unset: { order: 1 }, $set: { status: 0 } });
			}

			if (req.body.customer) {
				await CustomerModel.updateOne({ _id: req.body.customer }, { status: 2 });
			}
			res.status(200).json('Pay order successfully');
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
					await Order.updateOne({ _id: saveOrder._id }, { $set: { customer: cusSave._id } });
				} else {
					//Save customer id in order and order id in customer
					await Order.updateOne({ _id: saveOrder._id }, { $set: { customer: cus._id } });
					await Customer.updateOne({ _id: cus._id }, { $push: { order: saveOrder._id } });
				}

				const tablesInput = req.body.bookingTable.split(',').map(Number);
				const tables = await Table.find({ table_num: { $in: tablesInput } });
				await Order.updateOne({ _id: saveOrder._id }, { $set: { tables: tables } });
			}
			if (!req.body.customerPhone) {
				bookingTable(req.body.bookingTable, saveOrder);
			}

			//Modify table
			// if (!req.body.time_booking) {
			// bookingTable(req.body.bookingTable, saveOrder);
			// } else {
			// 	const timeBooking = new Date(req.body.time_booking);
			// 	const reminderTime = new Date(timeBooking.getTime() - 60 * 60 * 1000);
			// 	const delay = reminderTime.getTime() - Date.now();
			// 	//schedule table when customer booking
			// 	setTimeout(() => {
			// 		console.log('Running');
			// 		bookingTable(req.body.bookingTable, saveOrder);
			// 	}, delay);
			// }

			res.status(200).json({ orderId: saveOrder._id });
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

async function bookingTable(bookingTable, saveOrder) {
	const tablesInput = bookingTable.split(',').map(Number);
	await Table.updateMany({ table_num: { $in: tablesInput } }, { $set: { order: saveOrder._id } });

	const tables = await Table.find({ table_num: { $in: tablesInput } });
	await Order.updateOne({ _id: saveOrder._id }, { $set: { tables: tables } });
}

module.exports = orderController;
