var express = require("express");
var router = express.Router();
const Contestant = require("../model/contestant");
const auth = require("../middleware/auth");
const Vote = require("../model/votes");

router.get("/", (req, res) => {
  Contestant.find({}, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.post("/", (req, res) => {
  try {
    Contestant.create(req.body, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  } catch (e) {
    return res.status(500).send({ message: "Invalid request" });
  }
});

module.exports = router;
