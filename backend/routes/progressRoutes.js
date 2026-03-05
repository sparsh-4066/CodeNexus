const express = require("express");
const router = express.Router();

const {
  addProgress,
  getProgress,
  deleteProgress,
  getStats
} = require("../controllers/progressController");

const { protect } = require("../middleware/authMiddleware");


// ADD A SOLVED PROBLEM
router.post("/", protect, addProgress);


// GET ALL SOLVED PROBLEMS
router.get("/", protect, getProgress);


// DELETE A PROBLEM
router.delete("/:id", protect, deleteProgress);


// GET STATISTICS
router.get("/stats", protect, getStats);


module.exports = router;