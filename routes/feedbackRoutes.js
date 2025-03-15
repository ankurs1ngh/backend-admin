const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

router.post("/", async (req, res) => {
    try {
      const { questionId, answer, textFeedback } = req.body;
  
      if (!questionId || !answer) {
        return res.status(400).json({ error: "Question ID and answer are required" });
      }
  
      const feedback = new Feedback({ questionId, answer, textFeedback });
      await feedback.save();
  
      res.status(201).json({ message: "Feedback submitted successfully", feedback });
    } catch (error) {
      console.error("Error saving feedback:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

// GET: Retrieve all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("questionId");
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Get feedback for a specific question
router.get("/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const feedbacks = await Feedback.find({ questionId }).populate("questionId");

    if (!feedbacks.length) {
      return res.status(404).json({ message: "No feedback found for this question" });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback for question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
