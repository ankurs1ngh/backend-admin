const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    answer: { type: mongoose.Schema.Types.Mixed, required: true }, // Yes/No, Rating, Multiple/Single Choice
    textFeedback: { type: String, default: "" }, // Separate text feedback field
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
