const mongoose = require("mongoose");

const menuItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("MenuItem", menuItem);
