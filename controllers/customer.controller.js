const CustomerModel = require('../model/Customer.model');

const cusController = {
	getAllCus: async (req, res) => {
		try {
			const cus = await CustomerModel.find(res.query).populate('order', '_id time_booking', null, { sort: { time_booking: -1 } });
			res.status(200).json(cus);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	updateCus: async (req, res) => {
		try {
			const cus = await CustomerModel.findById(req.query.id);
			await cus.updateOne({ $set: { ...req.body } });
			res.status(200).json('Update successfuly');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	deleteCus: async (req, res) => {
		try {
			const cus = await CustomerModel.findById(req.query.id);

			await cus.updateOne({ $set: { is_deleted: true } });

			res.status(200).json('Delete successfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = cusController;
