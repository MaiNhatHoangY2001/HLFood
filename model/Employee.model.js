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
  job_title: {
    type: String,
    required: true,
    trim: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  tables: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tables",
    }
  ],
  shifts:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
    }
  ],
  orders:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    }
  ]
});

hasingPass(employee);

module.exports = mongoose.model("Employee", employee);