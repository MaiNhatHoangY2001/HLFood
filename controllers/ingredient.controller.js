const Ingredient = require("../model/Ingredient.model");

const ingredientController = {
    getAllIngredient: async (req, res) => {
        try {

            const listIngredient = await Ingredient.find();
            res.status(200).json(listIngredient);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = ingredientController;
