const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    type: { type: String, enum: ["yes_no", "rating", "single_choice", "multiple"], required: true },
    options: { type: [String], default: [] }, // Only used for choice-based questions
    isPublished: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }, // Soft delete
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
