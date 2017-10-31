const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser')

const router = express.Router();
let Grades = models.grades;

router.use(bodyParser.json());


router.post('/add', (req, res) => {
    console.log('this is the request body for grades', req.body.vals)
    Grades
    .findOrCreate({ where: {
        student_id: req.body.vals.student,
        grade: req.body.vals.grade,
        course_id: req.body.vals.course,
        description: req.body.vals.description
    }}).spread( (grade, created) => {
        res.send({grade, created})
    })
})

module.exports = router;