const mongoose = require("mongoose");
const { Schema } = mongoose;
const blogSchema = new Schema(
  {
    url: { type: String },
    favicon: { type: String },
    social_media: {
      fb: { type: String, default: "" },
      wa: { type: String, default: "" },
      ins: { type: String, default: "" },
      yb: { type: String, default: "" },
      lnk: { type: String, default: "" },
      tw: { type: String, default: "" },
    },

    title: { type: String },
    email: { type: String },
    address: { type: String },
    mobile: { type: String },
    desc: { type: String },
    category: { type: String },
    type: {
      type: String,
      enum: ["banner", "blog", "site"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Blogs: mongoose.model("Blogs", blogSchema) };
