require("dotenv").config();

const express = require("express");
const server = express();

const db = require("../data/db");
const Users = require("../data/models/userModel");
const configureMiddleware = require("./middleware");
const authRouter = require("../auth0/auth-router");

configureMiddleware(server);

server.use("/api/auth", authRouter);

server.get("/api", (req, res) => {
  res.send("Server works.");
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
