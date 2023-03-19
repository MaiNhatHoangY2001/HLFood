const mongoose = require("mongoose");

const receipt_detail = new mongoose.Schema({
    quantity: {
        type: Number,
        default: 0,
    },
    total_detail_price: {
        type: Number,
        default: 0,
    },
    weight_per_quantity: {
        type: Number,
        default: 0,
    },
    receipt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receipt"
    },
    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient"
    },
});

module.exports = mongoose.model("ReceiptDetail", receipt_detail);
