const mongoose = require("mongoose");

const order = new mongoose.Schema({
    time_created: {
        type: Date,
        default: Date.now,
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
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        }
    ],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    }   

})

module.exports = mongoose.model("Order", order);