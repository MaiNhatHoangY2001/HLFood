const mongoose = require("mongoose");

const loyaltyProgram = new mongoose.Schema({
    reward: {
        type: String,
        required: true,
    },
    tier: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('LoyaltyProgram', loyaltyProgram);
