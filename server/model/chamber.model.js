const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  day: { type: String, required: true  },
  time: { type: [String], required: true },
});

const chamberSchema = new mongoose.Schema({
  chamber: { type: String, required: true, unique: true }, // Unique field
  schedule: { type: [scheduleSchema], required: true },
});

module.exports = { Chamber: mongoose.model("Chamber", chamberSchema) };
