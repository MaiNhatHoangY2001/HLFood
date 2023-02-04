import hasingPass from "../middleware/hasingPasword";

const mongoose = require("mongoose");

const customer = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  billHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BillHistory",
    },
  ],
  preference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Preference",
  },
  loyaltyProgramStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoyaltyProgram",
  },
  paymentMethods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
    },
  ],
  admin: {
    type: Boolean,
    default: false,
  },
});

hasingPass(customer);

module.exports = mongoose.model("Customer", customer);
