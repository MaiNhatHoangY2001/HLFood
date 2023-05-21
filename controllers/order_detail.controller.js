const Order_detail = require('../model/Order_detail.model');
const Food = require('../model/Food.model');
const Order = require('../model/Order.model');

const orderDetailController = {
	getAllOrderDetail: async (req, res) => {
		try {
			const orderDetails = await Order_detail.find(req.query)
				.populate('food order')
				.populate({
					path: 'order',
					populate: { path: 'tables' },
				});
			res.status(200).json(orderDetails);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// Booking Food
	addListOrderDetail: async (req, res) => {
		try {
			const orderDetails = req.body.orderDetails;

			for (const orderDetail of orderDetails) {
				const orderDetailAwait = await Order_detail.findOne({ food: orderDetail.food, order: orderDetail.order });
				if (orderDetailAwait) {
					const orderDetailOld = Order_detail.findById(orderDetailAwait._id);
					const food = await Food.findById(orderDetail.food);

					const quantityNew = orderDetailAwait.quantity + orderDetail.quantity;
					const totalDetailPrice = food.price * quantityNew;
					//Update price
					await orderDetailOld.updateOne({ $set: { quantity: quantityNew, total_detail_price: totalDetailPrice } });
				} else {
					const newOrderDetail = new Order_detail(orderDetail);
					const saveOrder = await newOrderDetail.save();
					const food = Food.findById(orderDetail.food);
					await food.updateOne({ $push: { order_details: saveOrder._id } });

					const order = Order.findById(orderDetail.order);
					await order.updateOne({ $push: { order_details: saveOrder._id } });
				}
			}
			res.status(200).json('Add Food Succesfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	updateOrderDetails: async (req, res) => {
		try {
			const orderDetails = req.body;
			let totalOrderPrice = 0;
			let orderId = '';

			for (const orderDetail of orderDetails) {
				const { _id, food, order, time_created, ...dataOrderDetail } = orderDetail;
				await Order_detail.updateOne({ _id: _id }, { $set: { ...dataOrderDetail } });

				const OrderDetail = await Order_detail.findById(_id);
				orderId = OrderDetail.order;
				totalOrderPrice += OrderDetail.total_detail_price;
			}
			const order = await Order.findById(orderId);
			await Order.updateOne({ _id: orderId }, { $set: { total_order_price: totalOrderPrice + totalOrderPrice * order.vat } });

			res.status(200).json('Update Order details succesfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	subtractOrderDetail: async (req, res) => {
		try {
			const idOrderDetail = req.body.id;
			const quantity = req.body.quantity;
			const total = req.body.total_detail_price;

			const orderDetail = Order_detail.findById(idOrderDetail);
			await orderDetail.updateOne({ $set: { quantity: quantity, total_detail_price: total } });

			res.status(200).json('Subtract Food Succesfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	deleteOrderDetail: async (req, res) => {
		try {
			const idOrderDetail = req.params.id;
			await Order_detail.findByIdAndRemove(idOrderDetail);

			await Order.updateOne({ order_details: idOrderDetail }, { $pull: { order_details: idOrderDetail } });
			await Food.updateOne({ order_details: idOrderDetail }, { $pull: { order_details: idOrderDetail } });

			res.status(200).json('Delete Food Succesfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	changeFoodStatus: async (req, res) => {
		try {
			const id = req.body.id;
			const quantityFinish = req.body.quantity_finish;
			let status = 0;

			const orderDetail = await Order_detail.findById(id);
			if (orderDetail.quantity_finish === quantityFinish) {
				status = 1;
			}

			await Order_detail.updateOne({ _id: id }, { $set: { quantity_finished: quantityFinish, status: status } });

			res.status(200).json('Update status successfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};
module.exports = orderDetailController;
