const mongoose = require("mongoose");

const ScholarshipSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ratingsAverage: { type: Number, default: 0 },
  ratingsQuantity: { type: Number, default: 0 },
  // priceDiscount: { type: Number, default: 0 },
  amount: {
    type: Number,
    // required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageCover: {
    type: String,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now(),
  // },
  // startDates: [Date],
  state: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    default: "India",
  },
  link: {
    type: String,
    require: true,
  },
  count: { type: Number, require: true },
});
// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
// tourSchema.pre(/^find/, function (next) {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });
// tourSchema.pre("aggregate", function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   next();
// });
const Scholarship = mongoose.model("Scholarship", ScholarshipSchema);
module.exports = Scholarship;
