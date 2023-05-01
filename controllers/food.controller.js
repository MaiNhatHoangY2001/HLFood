const Food = require('../model/Food.model');

const foodController = {
	getAllFood: async (req, res) => {
		try {
			const listFood = await Food.find();
			res.status(200).json(listFood);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	getAllFoodActive: async (req, res) => {
		try {
			const listFood = await Food.find({ is_deleted: false });
			res.status(200).json(listFood);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	addFood: async (req, res) => {
		try {
			const newFood = new Food(req.body);
			const saveFood = await newFood.save();
			res.status(200).json(saveFood);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	deleteFood: async (req, res) => {
		try {
			const food = await Food.findById(req.query.id);
			await food.updateOne({ $set: { is_deleted: true } });
			res.status(200).json('Delete food successfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = foodController;
