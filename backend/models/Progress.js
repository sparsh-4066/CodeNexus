const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  problemName: {
    type: String,
    required: true
  },

  platform: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true
  },

  topic: {
    type: String
  },

  dateSolved: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);