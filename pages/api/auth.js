const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Bcrypt = require("bcryptjs");
const Joi = require("joi");
const UserModel = require("../../models/userModel");
const authMiddleware = require("../../middleware/authMiddleware");

const schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

router.get("/", authMiddleware, async (req, res) => {
  const { user } = req;
  try {
    const usesdata = await UserModel.findById(user);
    const usesdataFollowers = await UserModel.findOne({ user });
    res.send({ usesdata, usesdataFollowers });
  } catch (error) {
    res.status(500).send("error");
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    await schema.validateAsync({
      email: email,
    });
    let user = await UserModel.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(401).send("invalid credentials");
    }

    const comparePassword = Bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).send("invalid credentials");
    }

    jwt.sign(
      { user: user._id },
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
