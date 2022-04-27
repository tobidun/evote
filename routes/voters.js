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

router.post(
  "/signup",
  [
    check("username", "Please Enter a valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
    check("age", "Please Enter a age that is 18 and above").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { username, email, password, age } = req.body;
    try {
      let isVoterExist = await Voter.findOne({ email: email });
      if (isVoterExist) {
        return res.status(400).json({
          message: "Email already exist",
        });
      }
      let isUsernameExist = await Voter.findOne({ username: username });
      if (isUsernameExist) {
        return res.status(400).json({
          message: "Username already exist",
        });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const voter = new Voter({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        age: req.body.age,
      });
      const savedVoter = await voter.save();
      res.json(savedVoter);
    } catch (e) {
      res.json({ message: "Error" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const voter = await Voter.findOne({ email: req.body.email });

      if (!voter)
        return res.status(400).json({
          message: "Voter Not Exist",
        });

      const match = await bcrypt.compare(req.body.password, voter.password);

      if (!match)
        return res.status(400).json({
          message: "Incorrect Password!",
        });

      const accessToken = jwt.sign(
        {
          voter: {
            id: voter.id,
          },
        },
        "secret"
      );
      if (match) {
        res.json({ accessToken: accessToken });
      } else {
        res.json({ message: "Invalid Credentials" });
      }
    } catch (e) {
      console.log(e);
    }
  }
);

router.post("/logout", async (req, res) => {
  try {
    console.log("You have successfully logout");
    res.send({ message: "You have successfully logout" });
  } catch (e) {
    console.log(e);
    res.json({ message: Error });
  }
});
module.exports = router;
