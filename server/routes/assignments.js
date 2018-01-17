/**@module record_delete_route */


const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const Assignments = models.assignments;
const User_History = models.history;
const sequelize = models.sequelize;

router.use(bodyParser.json());

/**
 * returns {Array} of data objects from the assignments table that are associated with user requester
 * for route /assignments, /grades
 */
router.post('/', (req, res) => {
    Assignments
    .findAll({ where: {
        course_id: req.body.course_id
    }})
    .then( assignments => {
        assignments.forEach( item => {
            item.dataValues.display = item.dataValues.assignment_name,
            item.dataValues.type = 'assignment'
        })
        res.status(200).send(assignments);
    })
})

/**
 * returns {Array} of assignment objects for client to display in the tables_assignment component 
 * for route /assignments, /grades
 */

router.post('/all', (req, res) => {
    const get_assignments = require('./sql_queries').get_assignments(req.body.fb_id) 
    sequelize.query( get_assignments,
    { type: sequelize.QueryTypes.SELECT}).then( (assignments) => {
        assignments.forEach( item => {
            item.type = 'assignment'
        })
        res.status(200).send(assignments)
    })
})

/**
 * returns {Object} with response message for client to display for user modal in creation of assignment
 * for use in the route /assignments
 */
router.post('/add', (req, res) => {
    Assignments
    .findOrCreate( { where: {
        course_id: req.body.vals.course,
        assignment_name: req.body.vals.assignment
    }}).spread( (assignment, created) => {
        /**add to history table after success for user activity feed */
        User_History
        .findOrCreate({ where: {
            fb_id: req.body.fb_id,
            transaction: `Added assignment ${req.body.vals.assignment}`
        }})
        .spread( (history, created) => {
            res.status(200).send({msg: history.transaction})
        })
    })
})


module.exports = router;