const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
});

module.exports = { Review: mongoose.model("Review", itemSchema) };
