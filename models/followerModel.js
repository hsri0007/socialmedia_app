const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followermodel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "socialusers",
  },
  followers: [
    {
      user: { type: Schema.Types.ObjectId, ref: "socialusers" },
    },
  ],
  following: [
    {
      user: { type: Schema.Types.ObjectId, ref: "socialusers" },
    },
  ],
});

module.exports = mongoose.model("follower", followermodel);
