const mongoose = require("mongoose");

const booking = new mongoose.Schema({
    table_num: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    time_booking: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        required: true,
    },
    order:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    employee:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    }

});

module.exports = mongoose.model("Booking", booking);
