// require mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define your review schema
let reviewSchema = new Schema({
  username: String,
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

let Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
