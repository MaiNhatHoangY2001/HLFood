const mongoose = require("mongoose");

const notification = new mongoose.Schema({
    is_read: {
        type: Boolean,
        default: false
    },
    time_created: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    history_order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HistoryOrder"
    }
});


module.exports = mongoose.model("Notification", notification);