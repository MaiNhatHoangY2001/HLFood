const mongoose = require("mongoose");

const ingredient = new mongoose.Schema({
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
    quantitative: {
        type: Number,
        require: true,
    },
    type_quantitative: {
        type: Number,
        require: true,
    },
    order_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderDetail",
        }
    ]
});

module.exports = mongoose.model("Ingredient", ingredient);
