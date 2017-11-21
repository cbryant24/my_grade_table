/**@module record_delete_route */

const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

let Students = models.students;
let User_History = models.history;
let Grades = models.grades;
let Assignments = models.assignments;
let Courses = models.courses;

const router = express.Router();

/**
 * @function 
 * @param {Object} req client request object for deletion of database record 
 * @param {Object} res server response object with confirmation or error
 * @returns {Object} message with status for client deletion request from database,
 * deletion of request from database table dependent on request deletion object type
 */
router.use(bodyParser.json())
router.post('/', (req, res) => {
    if(req.body.type === 'course') {
        Courses.destroy(
            { where: {id: req.body.id}})
            .then( () => {
                /**add to history table after success for user activity feed */
                User_History
                .findOrCreate({ where: {
                    fb_id: req.body.fb_id,
                    transaction: `Deleted Course ${req.body.display}`
                }})
                .spread( (history, created) => {
                    res.status(200).send({msg: history.transaction})
                })
            })
    }
    if(req.body.type === 'student') {
        Students.destroy(
            { where: {id: req.body.id}})
            .then( () => {
                /**add to history table after success for user activity feed */
                User_History
                .findOrCreate({ where: {
                    fb_id: req.body.fb_id,
                    transaction: `Deleted student ${req.body.display}`
                }})
                .spread( (history, created) => {
                    res.status(200).send({msg: history.transaction})
                })
            })
    }
    if(req.body.type === 'assignment') {
        Assignments.destroy(
            { where: {id: req.body.id}})
            .then( () => {
                /**add to history table after success for user activity feed */
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
    if(req.body.type === 'grade') {
        Grades.destroy(
            { where: {id: req.body.id}})
            .then( () => {
                /**add to history table after success for user activity feed */
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

module.exports = router