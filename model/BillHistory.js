const mongoose = require("mongoose");

const billHistory = new mongoose.Schema({
    bills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bill",
        },
    ]
})

module.exports = mongoose.model("BillHistory", billHistory);