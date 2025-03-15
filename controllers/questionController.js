const Question = require("../models/question");

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { text, type, options , published } = req.body;
    const newQuestion = new Question({ text, type, options , isPublished:published});
    await newQuestion.save();
    res.status(201).json({ message: "Question created", question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all questions (excluding deleted ones)
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ isDeleted: false });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get only published questions (for the widget)
exports.getPublishedQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ isPublished: true, isDeleted: false });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a question
exports.updateQuestion = async (req, res) => {
  try {
    const { text, type, options, published} = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { text, type, options , isPublished:published},
      { new: true }
    );
    res.json({ message: "Question updated", question: updatedQuestion });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Publish/Unpublish a question
exports.togglePublishQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    question.isPublished = !question.isPublished;
    await question.save();
    res.json({ message: "Question publish status updated", question });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Soft delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: "Question deleted (soft delete)" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
