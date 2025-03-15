const express = require("express");
const {
  createQuestion,
  getQuestions,
  getPublishedQuestions,
  updateQuestion,
  togglePublishQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createQuestion);
router.get("/", authMiddleware, getQuestions); // Allow all authenticated users
router.get("/published", getPublishedQuestions); // No auth needed for the widget
router.put("/:id", authMiddleware, adminMiddleware, updateQuestion);
router.patch("/:id/publish", authMiddleware, adminMiddleware, togglePublishQuestion);
router.delete("/:id", authMiddleware, adminMiddleware, deleteQuestion);

module.exports = router;
