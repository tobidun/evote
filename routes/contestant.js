var express = require("express");
var router = express.Router();
const Contestant = require("../model/contestant");
const auth = require("../middleware/auth");
const Vote = require("../model/votes");

module.exports = router;
