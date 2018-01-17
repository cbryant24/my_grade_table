/**@module grades_route */

const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser')

const router = express.Router();
const Grades = models.grades;
const User_History = models.history;
const sequelize = models.sequelize;

router.use(bodyParser.json());


/**
 * returns {Object} message for client to display for user with status of created record
 */
router.post('/add', (req, res) => {
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
            /**add to history table after success for user activity feed */
            User_History
            .findOrCreate({ where: {
                fb_id: req.body.fb_id,
                transaction: `Added graded of ${req.body.vals.grade} for ${activity_info[0].last_name}, ${activity_info[0].first_name} in ${activity_info[0].assignment_name}, ${activity_info[0].course_name}`
            }})
            .spread( (history, created) => {
                res.status(200).send({msg: history.transaction})
            })

        })
    })
})

/**
 * returns {Object} data from the grades table that are associated with user request
 * for use in the route /grades
 */
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

/**
 * returns {Object} data from the grades table to confirm update, delete, creation of grade record
 */
router.post('/get-info', (req, res) => {
    /**
     * normalize client req data object
     */
    if(typeof req.body.student_id === 'object') 
        req.body.student_id = req.body.student_id.id
    if(typeof req.body.assignment_id === 'object') 
        req.body.assignment_id = req.body.assignment_id.id
    if(typeof req.body.course_id === 'object') 
        req.body.course_id = req.body.course_id.id

    let grade_activity = require('./sql_queries').grade_statement(req.body.student_id || req.body.student, req.body.course_id || req.body.course, req.body.assignment_id || req.body.assignment)

    sequelize.query(
        grade_activity,
        { type: sequelize.QueryTypes.SELECT}
    ).then( grade_info => {
        res.status(200).send(grade_info)
    })
})

module.exports = router;