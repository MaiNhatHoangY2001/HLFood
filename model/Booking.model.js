const mongoose = require("mongoose");

const booking = new mongoose.Schema({
    time_booking: {
        type: Date,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    employee:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },
    tables: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table",
        }
    ],
    pre_food: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PrepareFood",
        }
    ]

});

module.exports = mongoose.model("Booking", booking);
