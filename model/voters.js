const mongoose = require("mongoose");
const { Schema } = mongoose;

const voterSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  contestant: {
    type: { type: Schema.Types.ObjectId, ref: "Contestant" },
  },
});
const Voter = mongoose.model("Voter", voterSchema);

module.exports = Voter;
