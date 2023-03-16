const mongoose = require("mongoose");

const inventory = new mongoose.Schema({
    num_bill_one: {
        type: Number,
        required: true,
    },
    num_bill_two: {
        type: Number,
        required: true,
        trim: true,
    },
    num_bill_ten: {
        type: Number,
        required: true,
    },
    num_bill_fifty: {
        type: Number,
        required: true,
    },
    num_bill_one_hundred: {
        type: Number,
        required: true,
    },
    num_bill_two_hundred: {
        type: Number,
        required: true,
    },
    num_bill_five_hundred: {
        type: Number,
        required: true,
    },
    time_created: {
        type: Date,
        default: Date.now,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }
});

module.exports = mongoose.model("Inventory", inventory);