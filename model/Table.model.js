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
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    }
    ,
    employee:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    }

});

module.exports = mongoose.model("Table", table);
