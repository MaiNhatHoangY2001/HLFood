const mongoose = require("mongoose");

const pre_food = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true,
        trim: true,
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
    }
});


module.exports = mongoose.model("PrepareFood", pre_food);