const Progress = require("../models/Progress");


// ADD PROBLEM
exports.addProgress = async (req, res) => {
  try {

    const { problemName, platform, difficulty, topic } = req.body;

    const progress = new Progress({
      user: req.user._id,
      problemName,
      platform,
      difficulty,
      topic
    });

    const saved = await progress.save();

    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET ALL PROBLEMS
exports.getProgress = async (req, res) => {
  try {

    const progress = await Progress.find({ user: req.user._id });

    res.json(progress);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE PROBLEM
exports.deleteProgress = async (req, res) => {
  try {

    const progress = await Progress.findById(req.params.id);

    if (!progress) {
      return res.status(404).json({ message: "Problem not found" });
    }

    await progress.deleteOne();

    res.json({ message: "Problem deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET STATISTICS
exports.getStats = async (req, res) => {
  try {

    const stats = await Progress.aggregate([
      {
        $match: { user: req.user._id }
      },
      {
        $group: {
          _id: "$difficulty",
          count: { $sum: 1 }
        }
      }
    ]);

    let difficultyStats = {
      easy: 0,
      medium: 0,
      hard: 0
    };

    stats.forEach(stat => {
      if (stat._id === "Easy") difficultyStats.easy = stat.count;
      if (stat._id === "Medium") difficultyStats.medium = stat.count;
      if (stat._id === "Hard") difficultyStats.hard = stat.count;
    });

    const totalSolved =
      difficultyStats.easy +
      difficultyStats.medium +
      difficultyStats.hard;

    res.json({
      totalSolved,
      difficulty: difficultyStats
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};