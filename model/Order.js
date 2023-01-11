const mongoose = require("mongoose");

const order = new mongoose.Schema({
    quantity: {
        type: Number,
        default: 1,
    },
    item:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
    },
})

module.exports = mongoose.model("Order", order);