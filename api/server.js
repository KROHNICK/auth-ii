require("dotenv").config();

const express = require("express");
const server = express();
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const db = require("../data/db");
const Users = require("../data/models/userModel");
const configureMiddleware = require("./middleware");

const secret = process.env.JWT_SECRET || "secret";

configureMiddleware(server);

server.get("/api", (req, res) => {
  res.send("Server works.");
});

server.post("/api/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      if (req.body.username || req.body.password || req.body.department) {
        const token = generateToken(user);
        res.status(201).json({
          saved,
          message: "Registered.",
          token,
          secret
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

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

server.post("/api/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
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

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
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
}

server.get("/api/users", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json({
        users,
        decodedToken: req.decodedJwt
      });
    })
    .catch(err => res.send(err));
});

server.get("/users", restricted, async (req, res) => {
  try {
    const users = await Users.find();

    res.json(users);
  } catch (error) {
    res.send(error);
  }
});

server.get("/api/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send("Could not logout.");
      } else {
        res.send("Logged out successfully.");
      }
    });
  } else {
    res.end();
  }
});

module.exports = server;
