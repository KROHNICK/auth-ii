require("dotenv").config();

const express = require("express");
const server = express();

const db = require("../data/db");
const Users = require("../users/userModel");
const configureMiddleware = require("./middleware");
const authRouter = require("../auth0/auth-router");
const usersRouter = require("../users/users-router");
const secret = require("../config/secrets");

configureMiddleware(server);

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("Server works.");
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
