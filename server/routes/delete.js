const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

let Students = models.students;
let User_History = models.history;
let Grades = models.grades;
let Assignments = models.assignments;
let Courses = models.courses;

const router = express.Router();

router.use(bodyParser.json())
router.post('/', (req, res) => {
    if(req.body.type === 'course') {
        Courses.destroy(
            { where: {id: req.body.id}})
            .then( () => {
                User_History
                .findOrCreate({ where: {
                    fb_id: req.body.fb_id,
                    transaction: `Deleted Course ${req.body.display}`
                }})
                .spread( (history, created) => {
                    res.status(200).send(history)
                })
            })
    }
    if(req.body.type === 'student') {
        Students.destroy(
            { where: {id: req.body.id}})
            .then( () => {
                User_History
                .findOrCreate({ where: {
                    fb_id: req.body.fb_id,
                    transaction: `Deleted student ${req.body.display}`
                }})
                .spread( (history, created) => {
                    res.status(200).send(history)
                })
                res.sendStatus(200).send()
            })
    }
    if(req.body.type === 'assignment') {
        Assignments.destroy(
            { where: {id: req.body.id}})
            .then( () => {
                User_History
                .findOrCreate({ where: {
                    fb_id: req.body.fb_id,
                    transaction: `Deleted assignment ${req.body.assignment_name}`
                }})
                .spread( (history, created) => {
                    res.status(200).send({msg: history.transaction})
                })
            })
    }
    console.log('this is the body from grade destroy', req.body)    
    if(req.body.type === 'grade') {
        Grades.destroy(
            { where: {id: req.body.id}})
            .then( () => {
                console.log('deleted')
                User_History
                .findOrCreate({ where: {
                    fb_id: req.body.fb_id,
                    transaction: `Deleted grade of ${req.body.grade} for ${req.body.first_name}, ${req.body.last_name} in ${req.body.assignment_name}, ${req.body.course_name}`
                }})
                .spread( (history, created) => {
                    res.status(200).send({msg: history.transaction})
                })
            })
    }
})

// const grade_activity = require('./sql_queries').grade_statement(req.body.student_id, req.body.course_id, req.body.assignment_id)
// sequelize.query(
//     grade_activity,
//     { type: sequelize.QueryTypes.SELECT}
// ).then( activity_info => {
//     console.log('this is the daaaata from body on grades activity', activity_info)                    
    

module.exports = router