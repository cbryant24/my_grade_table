const express = require('express');

const students = require('./students');
const instructors = require('./instructors');
const history = require('./history');
const courses = require('./courses');
const grades = require('./grades');
const assignments = require('./assignments');
const students_courses = require('./students_courses')
const update_record = require('./update')
const delete_record = require('./delete');

const router = express.Router();

router.use('/instructors', instructors);
router.use('/api/students', students);
router.use('/api/get_activity', history);
router.use('/api/courses', courses);
router.use('/api/grades', grades);
router.use('/api/assignments', assignments);
router.use('/api/students_courses', students_courses)
router.use('/api/update', update_record)
router.use('/api/delete', delete_record)




module.exports = router;