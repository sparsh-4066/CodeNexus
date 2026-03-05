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

    const progress = await Progress.find({ user: req.user._id });

    let difficultyStats = { easy: 0, medium: 0, hard: 0 };
    let platformStats = {};
    let topicStats = {};

    progress.forEach(p => {

      // Difficulty stats
      if (p.difficulty === "Easy") difficultyStats.easy++;
      if (p.difficulty === "Medium") difficultyStats.medium++;
      if (p.difficulty === "Hard") difficultyStats.hard++;

      // Platform stats
      platformStats[p.platform] = (platformStats[p.platform] || 0) + 1;

      // Topic stats
      topicStats[p.topic] = (topicStats[p.topic] || 0) + 1;

    });

    res.json({
      totalSolved: progress.length,
      difficulty: difficultyStats,
      platforms: platformStats,
      topics: topicStats
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};