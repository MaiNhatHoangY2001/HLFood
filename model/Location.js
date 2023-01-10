const mongoose = require("mongoose");

const location = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  hours: {
    type: String,
    required: true,
    trim: true,
  },
  deliveryOption: {
    type: String,
    required: true,
  },
  stock: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
      quantity: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Location", location);
