const mongoose = require("mongoose");

const paymentMethod = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  nameOnCard: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('PaymentMethod', paymentMethod);
