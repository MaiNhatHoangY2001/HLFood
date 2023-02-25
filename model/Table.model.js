const mongoose = require("mongoose");

const table = new mongoose.Schema({
    table_num: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        }
    ],
    employee:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    }

});

module.exports = mongoose.model("Table", table);
