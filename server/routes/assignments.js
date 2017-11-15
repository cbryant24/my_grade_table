const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const Assignments = models.assignments;

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

module.exports = router;