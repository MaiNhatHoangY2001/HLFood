const mongoose = require("mongoose");

const food = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: Number,
        require: true,
    },
    order_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderDetail",
        }
    ],
    food_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodDetail",
        }
    ],
});

module.exports = mongoose.model("Food", food);
