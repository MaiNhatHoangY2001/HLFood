const mongoose = require("mongoose");

const food_detail = new mongoose.Schema({
    quantitative: {
        type: Number,
        default: 0,
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    },
    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient"
    },
});

module.exports = mongoose.model("FoodDetail", food_detail);
