const hasingPass = require("../middleware/hasingPasword");
const mongoose = require("mongoose");

const employee = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
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
  jobTitle: {
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
  admin: {
    type: Boolean,
    default: false,
  },
});

hasingPass(employee);

module.exports = mongoose.model("Employee", employee);