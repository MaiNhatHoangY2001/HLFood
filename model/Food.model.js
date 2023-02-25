const mongoose = require("mongoose");

const food = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
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
    order_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderDetail",
        }
    ],
    pre_food: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PrepareFood",
        }
    ]

});

module.exports = mongoose.model("Food", food);
