/**@module routes_index */


const express = require('express');

const students = require('./students');
const history = require('./history');
const courses = require('./courses');
const grades = require('./grades');
const assignments = require('./assignments');
const update_record = require('./update')
const delete_record = require('./delete');

const router = express.Router();

router.use('/api/students', students);
router.use('/api/get_activity', history);
router.use('/api/courses', courses);
router.use('/api/grades', grades);
router.use('/api/assignments', assignments);
router.use('/api/update', update_record)
router.use('/api/delete', delete_record)




module.exports = router;