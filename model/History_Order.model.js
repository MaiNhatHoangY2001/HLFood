const mongoose = require("mongoose");

const historyOrder = new mongoose.Schema({
    time_created: {
        type: Date,
        default: Date.now,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    status: {
        type: Number,
        default: 0
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    notifications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notification",
        }
    ],
});


module.exports = mongoose.model("HistoryOrder", historyOrder);