const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please add email"],
      unique: true,
      trime: true,
    },
    password: {
      type: String,
      required: [true, "please add password"],
      unique: 6,
      trime: 64,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
  