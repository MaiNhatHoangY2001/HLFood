const Notification = require('../model/Notification.model');
const Employee = require('../model/Employee.model');
const Order_detail = require('../model/Order_detail.model');

const notificationController = {
	getAllNotification: async (req, res) => {
		try {
			const notifications = await Notification.find(req.query);

			res.status(200).json(notifications);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	addNotification: async (req, res) => {
		try {
			const notification = new Notification(req.body);
			const saveNotifi = await notification.save();
			if (req.body.employee) {
				await Employee.updateOne({ _id: req.body.employee }, { $push: { notifications: saveNotifi._id } });
			}

			if (req.body.order_detail) {
				await Order_detail.updateOne({ _id: req.body.order_detail }, { $push: { notifications: saveNotifi._id } });
			}

			res.status(200).json(saveNotifi);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = notificationController;
