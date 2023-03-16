const mongoose = require("mongoose");

const historyOrder = new mongoose.Schema({
    time_created: {
        type: Date,
        default: Date.now,
    },

    order_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderDetail",
        }
    ],
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }
});


module.exports = mongoose.model("HistoryOrder", historyOrder);