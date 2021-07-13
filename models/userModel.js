const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usermodel = new Schema(
  {
    name: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      require: true,
      min: 6,
      max: 255,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
      max: 255,
      selected: false,
    },
    username: {
      type: String,
      require: true,
      min: 6,
      max: 255,
      unique: true,
      trim: true,
    },
    profilePicUrl: {
      type: String,
    },
    newMessagePopUp: {
      type: String,
      default: true,
    },
    unreadMessage: {
      type: String,
      default: true,
    },
    unreadNotofication: {
      type: String,
      default: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    resetToken: {
      type: String,
    },
    expireToken: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("socialusers", usermodel);
