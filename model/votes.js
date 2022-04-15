const mongoose = require("mongoose");
const { Schema } = mongoose;

const voteSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  contestant: { type: Schema.Types.ObjectId, ref: "Contestant" },
  voter: { type: Schema.Types.ObjectId, ref: "Voter" },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
