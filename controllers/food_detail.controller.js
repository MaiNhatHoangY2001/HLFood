const Food = require("../model/Food.model");
const FoodDetail = require("../model/Food_Detail.model");
const Ingredient = require("../model/Ingredient.model");

const foodDetailController = {
    addFoodDetail: async (req, res) => {
        try {
            const newFoodDetail = new FoodDetail(req.body);
            const saveFoodDetail = await newFoodDetail.save();


            if (req.body.food) {
                const food = Food.findById(req.body.food);
                await food.updateOne({ $push: { food_details: saveFoodDetail._id } });
            }

            if (req.body.ingredient) {
                const ingredient = Ingredient.findById(req.body.ingredient);
                await ingredient.updateOne({ $push: { food_details: saveFoodDetail._id } });
            }

            res.status(200).json(saveFoodDetail);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = foodDetailController;
