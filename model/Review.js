const mongoose = require("mongoose");

const review = new mongoose.Schema({
    reviewDate: {
        type: Date,
        default: Date.now,
    },
    rating: {
        type: Number,
        required: true,
    },
    reviewText: {
        type: String,
        trim: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    item:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
    },
});

module.exports = mongoose.model('Review', review);
