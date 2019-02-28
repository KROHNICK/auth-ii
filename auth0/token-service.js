const jwt = require("jsonwebtoken");

const secret = require("../config/secrets");

module.exports = {
  generateToken
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.department
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}
