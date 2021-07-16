const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("unauthorized");
    }

    const { user } = jwt.verify(
      req.headers.authorization,
      process.env.JWTSECRET
    );

    req.user = user;

    next();
  } catch (error) {
    // return res.status(401).send("unauthorized");
  }
};
