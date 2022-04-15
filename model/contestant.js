const mongoose = require("mongoose");
const { Schema } = mongoose;

const contestantSchema = new Schema({
  name: String,
  party: String,
  createdAt: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 },
  voter: { type: Schema.Types.ObjectId, ref: "Voter" },
});

const Contestant = mongoose.model("Contestant", contestantSchema);

module.exports = Contestant;
