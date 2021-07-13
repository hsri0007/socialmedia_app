const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profilemodel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "socialusers",
  },
  bio: {
    type: String,
  },
  socilalinks: {
    youtube: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
  },
});

module.exports = mongoose.model("profile", profilemodel);
