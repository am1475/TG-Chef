const express = require('express');
const { getAllStudents, addStudent, getStudentById } = require('../controllers/studentController');

const router = express.Router();

router.get('/', getAllStudents);
router.post('/', addStudent);
router.get('/:id', getStudentById);

module.exports = router;
