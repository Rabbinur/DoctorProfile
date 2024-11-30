const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first_name is required"],
      trim: true,
      maxlength: [50, "first_name cannot be more than 50 characters"],
      minlength: [4, "first_name cannot be less then 5 characters"],
      // unique: true,
    },
    last_name: {
      type: String,
      required: [true, "last_name is required"],
      trim: true,
      maxlength: [50, "last_name cannot be more than 50 characters"],
      minlength: [4, "last_name cannot be less then 5 characters"],
      // unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      set: (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10)),
    },
    phone: {
      type: String,
      required: true,
    
    },
    avatar: {
      type: String, // cloudinary url
      // required: false,
    },
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
    documents: [{
      secureUrl: String,
      publicId: String,
    }],
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
   
 
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: String, // Token for email verification
    verificationTokenExpires: Date, // Expiry date for the token
    passwordResetToken: String, // Token for resetting password
    passwordResetExpires: Date, // Expiry date for the reset token
  },
  { timestamps: true }
);


module.exports = { User:mongoose.model("User", userSchema) };

