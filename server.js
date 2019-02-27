const express = require("express");
const server = express();
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const morgan = require("morgan");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

server.get("/api", (req, res) => {
  res.send("Server works.");
});

module.exports = server;
