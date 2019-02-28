const router = require("express").Router();
const bcrypt = require("bcryptjs");

const tokenService = require("../auth0/token-service");
const Users = require("../users/userModel");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      if (req.body.username || req.body.password || req.body.department) {
        res.status(201).json({
          saved,
          message: "Registered."
        });
      } else {
        res.status(500).json(err);
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Unable to register."
      });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);
        res.status(200).json({
          message: `Welcome ${
            user.username
          }! Successfully loggin in, here's a cookie and a token`,
          token
        });
      } else {
        res
          .status(401)
          .json({ message: "Invalid Credentials. You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
