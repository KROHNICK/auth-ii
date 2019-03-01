const router = require("express").Router();

const Users = require("./userModel");
const restricted = require("../auth0/restricted-middleware");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json({
        users,
        decodedToken: req.decodedJwt
      });
    })
    .catch(err => res.send(err));
});

module.exports = router;
