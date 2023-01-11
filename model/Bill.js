const mongoose = require("mongoose");

const bill = new mongoose.Schema({
  timeCreated: {
    type: Date,
    default: Date.now,
  },
  deliveryType: {
    type: String,
    required: true,
    trim: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
    trim: true,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentMethod",
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  coupons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  }
});

module.exports = mongoose.model("Bill", bill);
