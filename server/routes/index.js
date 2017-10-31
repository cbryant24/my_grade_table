const express = require('express');


const students = require('./students');
const instructors = require('./instructors');
const history = require('./history');
const courses = require('./courses');
const grades = require('./grades');

const router = express.Router();

router.use('/instructors', instructors);
router.use('/api/students', students);
router.use('/api/get_activity', history);
router.use('/api/courses', courses);
router.use('/api/grades', grades)




module.exports = router;