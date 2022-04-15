var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Voter = require("../model/voters");

router.get("/", (req, res) => {
  Voter.find({}, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

module.exports = router;
