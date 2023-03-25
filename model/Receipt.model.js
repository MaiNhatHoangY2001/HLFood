const mongoose = require("mongoose");

const receipt = new mongoose.Schema({
    time_created: {
        type: Date,
        default: Date.now,
    },
    location: {
        type: String,
        require: true,
    },
    total_receipt_price: {
        type: Number,
        default: 0,
    },
    vat: {
        type: Number,
        default: 0.1,
    },
    receipt_detail: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReceiptDetail",
        }
    ],
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
});

module.exports = mongoose.model("Receipt", receipt);
