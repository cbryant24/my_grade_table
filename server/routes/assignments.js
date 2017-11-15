const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const Assignments = models.assignments;
const User_History = models.history;
const sequelize = models.sequelize;

router.use(bodyParser.json());

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

router.post('/add', (req, res) => {
    console.log('this is the req body from assignment', req.body)
    Assignments
    .findOrCreate( { where: {
        course_id: req.body.vals.course,
        assignment_name: req.body.vals.assignment
    }}).spread( (assignment, created) => {
        User_History
        .findOrCreate({ where: {
            fb_id: req.body.fb_id,
            transaction: `Added assignment ${req.body.vals.assignment}`
        }})
        .spread( (history, created) => {
            res.status(200).send(history)
        })
    })
})

module.exports = router;