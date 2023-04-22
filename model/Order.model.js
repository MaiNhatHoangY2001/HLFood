const mongoose = require("mongoose");

const order = new mongoose.Schema({
    time_created: {
        type: Date,
        default: Date.now,
    },
    time_booking: {
        type: Date,
        default: Date.now()
    },
    vat: {
        type: Number,
        default: 0.1,
    },
    total_order_price: {
        type: Number,
        default: 0,
    },
    exchange_price: {
        type: Number,
        default: 0,
    },
    cus_give_price: {
        type: Number,
        default: 0,
    },
    is_pay: {
        type: Boolean,
        default: false,
    },
    deposit: {
        type: Number,
        default: 0,
    },
    order_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderDetail",
        }
    ],
    tables: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table",
        }
    ],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },

    notification: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notification",
        }
    ],
})

module.exports = mongoose.model("Order", order);