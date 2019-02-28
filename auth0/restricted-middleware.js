const secret = require("../config/secrets");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  const secret = require("../config/secrets");

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res
          .status(401)
          .json({ message: "Invalid credentials. You shall not pass!" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please provide valid token." });
  }
};
