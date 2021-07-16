const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Bcrypt = require("bcryptjs");
const UserModel = require("../../models/userModel");
const ProfileModel = require("../../models/profileModel");
const FollowerModel = require("../../models/followerModel");
const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const validation = await schema.validateAsync({ username: username });
    const user = await UserModel.findOne(validation);
    if (user) res.status(401).send("user already exit");
    res.send("Available");
  } catch (error) {
    res.status(500).send(error["details"][0]?.message || "error");
  }
});

router.post("/", async (req, res) => {
  const { name, email, password, bio, facebook, youtube, twitter, instagram } =
    req.body;

  console.log(req.body);

  try {
    await schema.validateAsync({
      username: name,
      email: email,
    });
    let user = await UserModel.findOne({ email: email });
    // res.send("user");
    if (user) res.status(400).send("email already exit");
    let userdata = new UserModel(req.body);
    userdata.password = await Bcrypt.hash(password, 10);
    userdata.profilePicUrl = "";
    await userdata.save();

    let profileField = {};

    profileField.user = userdata._id;
    profileField.bio = bio;

    if (facebook) profileField.facebook = facebook;
    if (youtube) profileField.youtube = youtube;
    if (twitter) profileField.twitter = twitter;
    if (instagram) profileField.instagram = instagram;

    await new ProfileModel(profileField).save();
    await new FollowerModel({
      user: userdata._id,
      followers: [],
      following: [],
    }).save();

    jwt.sign(
      { user: userdata._id },
      process.env.JWTSECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (error) {
    res
      .status(500)
      .send(
        (error?.details?.length > 0 && error?.details[0]?.message) || error
      );
  }
});

module.exports = router;
