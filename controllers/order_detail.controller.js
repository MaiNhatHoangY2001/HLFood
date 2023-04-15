const Order_detail = require("../model/Order_detail.model");
const Food = require("../model/Food.model");
const History_Order = require("../model/History_Order.model");
const Order = require("../model/Order.model");


const orderDetailController = {
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
                //Add Histoty Order
                addOrderHistory(orderDetail);
            }
            res.status(200).json("Add Food Succesfully");
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

            res.status(200).json("Subtract Food Succesfully");
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

            res.status(200).json("Delete Food Succesfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    subtractOrderHistory: async (req, res) => {
        try {
            const idOrderHistory = req.body.id;
            const quantity = req.body.quantity;

            const historyOrder = History_Order.findById(idOrderHistory);
            await historyOrder.updateOne({ $set: { quantity: quantity } });
            res.status(200).json("Subtract Food Succesfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteOrderHistory: async (req, res) => {
        try {
            const idHistoryOrder = req.params.id;
            await History_Order.findByIdAndRemove(idHistoryOrder);

            await Order.updateOne({ history_order: idHistoryOrder }, { $pull: { history_order: idHistoryOrder } });
            await Food.updateOne({ history_order: idHistoryOrder }, { $pull: { history_order: idHistoryOrder } });

            res.status(200).json("Delete Food Succesfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

async function addOrderHistory(orderDetail) {
    const newHistoryOrder = new History_Order({
        quantity: orderDetail.quantity,
        food: orderDetail.food,
        order: orderDetail.order
    })
    const saveHistoryOrder = await newHistoryOrder.save();
    //Add id historuy order
    const order = Order.findById(orderDetail.order);
    await order.updateOne({ $push: { history_order: saveHistoryOrder._id } });
    //Add id food
    const food = Food.findById(orderDetail.order);
    await food.updateOne({ $push: { history_order: saveHistoryOrder._id } });
}

module.exports = orderDetailController;