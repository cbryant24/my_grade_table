const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser')

const router = express.Router();
const Grades = models.grades;
const User_History = models.history;
const sequelize = models.sequelize;

router.use(bodyParser.json());

router.post('/add', (req, res) => {
    console.log('this is the req from body on grades', req.body)
    Grades
    .findOrCreate({ where: {
        student_id: req.body.vals.student,
        course_id: req.body.vals.course,        
        grade: req.body.vals.grade,
        assignment_id: req.body.vals.assignment
    }}).spread( (grade, created) => {
        const grade_activity = require('./sql_queries').grade_statement(req.body.vals.student, req.body.vals.course, req.body.vals.assignment)
        sequelize.query(
            grade_activity,
            { type: sequelize.QueryTypes.SELECT}
        ).then( activity_info => {
            console.log('this is the data from body on grades activity', activity_info)            
            User_History
            .findOrCreate({ where: {
                fb_id: req.body.fb_id,
                transaction: `Added graded of ${req.body.vals.grade} for ${activity_info[0].last_name}, ${activity_info[0].first_name} in ${activity_info[0].assignment_name}, ${activity_info[0].course_name}`
            }})
            .spread( (history, created) => {
                res.status(200).send(history)
            })

        })
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