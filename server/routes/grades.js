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
    const get_grades = require('./sql_queries').get_grades(req.body.fb_id) 
    sequelize.query( get_grades,
    { type: sequelize.QueryTypes.SELECT}).then( (student_grades) => {
        student_grades.forEach( item => {
            item.type = 'grade'
        })
        res.status(200).send(student_grades)
    })
})

module.exports = router;