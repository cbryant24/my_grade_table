const express = require('express');


const students = require('./students');
const instructors = require('./instructors')
const history = require('./history')

const router = express.Router();

router.use('/instructors', instructors);
router.use('/api/students', students);
router.use('/api/get_activity', history)




module.exports = router;