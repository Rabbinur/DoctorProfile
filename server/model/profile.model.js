const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const profileSchema = new Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  desc: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  services: { type: [String], required: true,unique: true },
});

module.exports = { Profile: mongoose.model("Profile", profileSchema) };
