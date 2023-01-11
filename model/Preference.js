const mongoose = require("mongoose");

const preference = new mongoose.Schema({
    preference: {
        type: String,
        required: true,
    },
    restriction: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Preference', preference);
