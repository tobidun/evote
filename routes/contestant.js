var express = require("express");
var router = express.Router();
const Contestant = require("../model/contestant");
const auth = require("../middleware/auth");
const Vote = require("../model/votes");
const { validationResult } = require("express-validator");

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

router.post("/vote/:id", auth, async (req, res) => {
  try {
    console.log(req.voter.id);
    const hasVoted = await Vote.findOne({ voter: req.voter.id });
    console.log(hasVoted);
    if (hasVoted) {
      throw new Error("You cannot vote");
    }
    await Vote.create({ contestant: req.params.id, voter: req.voter.id });
    res.send({
      message: "You have been voted for",
    });
  } catch (e) {
    res.status(500).send({ message: e.message, success: false });
  }
});

router.get("/vote/all", async (req, res) => {
  try {
    const vote = await Vote.find().populate("voter");
    res.send({ message: vote });
    console.log(vote);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message, success: false });
  }
});

router.get("/count", async (req, res) => {
  try {
    const contestants = await Contestant.find();
    console.log(contestants[0]._id.toString());
    const voteYPP = await Vote.where(
      "contestant",
      contestants[0]._id.toString()
    ).countDocuments({
      constestant: contestants[0]._id.toString(),
    });

    const voteAPC = await Vote.where(
      "contestant",
      contestants[1]._id.toString()
    ).countDocuments();

    const votePDP = await Vote.where(
      "contestant",
      contestants[2]._id.toString()
    ).countDocuments();

    const voteAPGA = await Vote.where(
      "contestant",
      contestants[3]._id.toString()
    ).countDocuments();

    res.send({ YPP: voteYPP, APC: voteAPC, PDP: votePDP, APGA: voteAPGA });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message, success: false });
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const contestants = await Contestant.find();
//     console.log(contestants);
//     res.send({ message: contestants });
//   } catch (e) {
//     console.group(e);
//     res.status(500).send({ message: e.message, success: false });
//   }
// });
module.exports = router;
