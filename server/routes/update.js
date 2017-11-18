const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const Students = models.students;
const User_History = models.history;
const Grades = models.grades;
const Assignments = models.assignments;
const Courses = models.courses;
const sequelize = models.sequelize;
 

const router = express.Router();

router.use(bodyParser.json())
router.put('/', (req, res) => {
    console.log('this is the request body from update', req.body)    
    if(req.body.type === 'course') {
        Courses.update(
            { course_name: req.body.course_name},
            { where: {id: req.body.id}})
            .spread( (affectedCount, affectedRows) => {
                User_History
                .findOrCreate({ where: {
                    fb_id: req.body.fb_id,
                    transaction: `Updated course ${req.body.course_name}`
                }})
                .spread( (history, created) => {
                    res.status(200).send({msg: history.transaction})
                })
            }).catch(err => {
                console.log(err)
            })
    }
    if(req.body.type === 'student') {
        Students.update(
            { 
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                student_id: req.body.student_id
            },
            { where: {id: req.body.id}})
            .spread( (affectedCount, affectedRows) => {
                User_History
                .findOrCreate({ where: {
                    fb_id: req.body.fb_id,
                    transaction: `Updated student ${req.body.first_name} ${req.body.last_name}`
                }})
                .spread( (history, created) => {
                    res.status(200).send({msg: history.transaction})
                })
            }).catch(err => {
                console.log(err)
            })
    }
    if(req.body.type === 'assignment') {
        Assignments.update(
            { 
                assignment_name: req.body.assignment_name,
                course_id: req.body.course_id,
            },
            { where: {id: req.body.id}})
            .spread( (affectedCount, affectedRows) => {
                User_History
                .findOrCreate({ where: {
                    fb_id: req.body.fb_id,
                    transaction: `Updated assignment ${req.body.assignment_name}`
                }})
                .spread( (history, created) => {
                    res.status(200).send({msg: history.transaction})
                })
            }).catch(err => {
                console.log(err)
            })
    }
    if(req.body.type === 'grade') {
        if(typeof req.body.student_id === 'object') 
            req.body.student_id = req.body.student_id.id
        if(typeof req.body.assignment_id === 'object') 
            req.body.assignment_id = req.body.assignment_id.id
        if(typeof req.body.course_id === 'object') 
            req.body.course_id = req.body.course_id.id

        console.log('this be the req body from grade', req.body)
        Grades.update(
            { 
                student_id: req.body.student_id,
                course_id: req.body.course_id,
                grade: req.body.grade,
                assignment_id: req.body.assignment_id
            },
            { where: {id: req.body.id}})
            .spread( (affectedCount, affectedRows) => {
                console.log('these are the affectedCounts and rows', affectedCount, affectedRows)
                if(affectedCount == 0)  return res.status(200).send({msg: 'Sorry there was an error please try again'})
                const grade_activity = require('./sql_queries').grade_statement(req.body.student_id, req.body.course_id, req.body.assignment_id)
                sequelize.query(
                    grade_activity,
                    { type: sequelize.QueryTypes.SELECT}
                ).then( activity_info => {
                    User_History
                    .findOrCreate({ where: {
                        fb_id: req.body.fb_id,
                        transaction: `Updated grade to ${req.body.grade} for ${activity_info[0].first_name}, ${activity_info[0].last_name} in ${activity_info[0].assignment_name}, ${activity_info[0].course_name}`
                    }})
                    .spread( (history, created) => {
                        res.status(200).send({msg: history.transaction})
                    })

                })
            }).catch(err => {
                console.log(err)
            })
    }
})

module.exports = router