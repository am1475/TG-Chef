const axios = require('axios');
const Student = require('../models/Student');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new student
exports.addStudent = async (req, res) => {
  const { handle } = req.body;

  try {
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
    const userInfo = response.data.result[0];

    const newStudent = new Student({
      handle,
      name: userInfo.firstName + ' ' + userInfo.lastName,
      rating: userInfo.rating,
      maxRating: userInfo.maxRating,
      problemsSolved: 0, // This needs to be calculated based on user submissions
      submissionCount: 0, // This needs to be calculated based on user submissions
      mostSolvedProblems: [], // This needs to be calculated based on user submissions
    });

    const savedStudent = await newStudent.save();
    res.json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
