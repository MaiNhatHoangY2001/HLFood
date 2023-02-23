const mongoose = require("mongoose");

const customer = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone_num: {
        type: String,
        required: true,
        trim: true,
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        }
    ]
});


module.exports = mongoose.model("Customer", customer);