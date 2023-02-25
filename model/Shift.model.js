const mongoose = require("mongoose");

const shift = new mongoose.Schema({
    shift: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    employees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
        }
    ]
});

module.exports = mongoose.model("Shift", shift);
