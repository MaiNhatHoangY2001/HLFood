const mongoose = require("mongoose");

const order = new mongoose.Schema({
  timePlaced: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    default: 1,
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
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
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
});
