const axios = require('axios');
const Student = require('../models/Student');

// Get aggregated metrics
exports.getMetrics = async (req, res) => {
  try {
    const students = await Student.find(); 

    const totalRatings = students.reduce((acc, student) => acc + student.rating, 0);
    const totalProblemsSolved = students.reduce((acc, student) => acc + student.problemsSolved, 0);
    const totalSubmissionCount = students.reduce((acc, student) => acc + student.submissionCount, 0);

    const metrics = {
      averageRating: totalRatings / students.length,
      totalProblemsSolved,
      totalSubmissionCount,
    };

    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
