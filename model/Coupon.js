const mongoose = require("mongoose");
const moment = require("moment");
const schedule = require("node-schedule");

const coupon = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  discount: { type: Number, required: true },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  isRedeemable: { type: Boolean, default: false },
});

coupon.pre("save", function (next) {
  this.isRedeemable = moment().isBetween(this.validFrom, this.validUntil);
  next();
});

//update every with TIME_UPDATE
const TIME_UPDATE = 120;
const couponModel = mongoose.model("Coupon", coupon);
const rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, TIME_UPDATE);

//This will run every TIME_UPDATE minutes and will update all the elements
//that has end date less than current date and is active to in-active.
const j = schedule.scheduleJob(rule, function () {
  couponModel
    .updateMany(
      { endDate: { $lt: new Date() }, isActive: true },
      { $set: { isActive: false } }
    )
    .exec();
});

module.exports = couponModel;
