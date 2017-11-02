const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser')

const router = express.Router();
let Grades = models.grades;

const sequelize = models.sequelize

router.use(bodyParser.json());

router.post('/add', (req, res) => {
    Grades
    .findOrCreate({ where: {
        student_id: req.body.vals.students,
        course_id: req.body.vals.courses,        
        grade: req.body.vals.grade,
        assignment_id: req.body.vals.assignments
    }}).spread( (grade, created) => {
        res.send({grade, created})
    })
})

router.post('/', (req, res) => {
    sequelize.query(`SELECT students.first_name, students.last_name, grades.grade, courses.course_name, assignments.assignment_name FROM \`students\` JOIN \`grades\` ON students.id = grades.student_id JOIN \`courses\` ON courses.id = grades.course_id JOIN \`assignments\` ON assignments.id = grades.assignment_id WHERE students.fb_id = ${req.body.fb_id}`,
    { type: sequelize.QueryTypes.SELECT}).then( (student_grades) => {
        res.status(200).send(student_grades)
    })
})

module.exports = router;