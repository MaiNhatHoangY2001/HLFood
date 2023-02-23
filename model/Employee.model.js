const hasingPass = require("../middleware/hasingPasword");
const mongoose = require("mongoose");

const employee = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone_num: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
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
  admin: {
    type: Boolean,
    default: false,
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    }
  ]
});

hasingPass(employee);

module.exports = mongoose.model("Employee", employee);