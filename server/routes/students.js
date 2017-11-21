/**@module students_route */

const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
let Students = models.students;
let User_History = models.history;
let Grades = models.grades;

router.use(bodyParser.json())


/**
 * @function 
 * @param {Object} req client request object for data from the database students table 
 * @param {Object} res server response object with associated user students from database students table
 * @returns {Array} of data objects from the courses table that are associated with user requester
 */
router.post('/', (req, res) => {
    Students
    .findAll({ where: {
        fb_id: req.body.fb_id
    }})
    .then( students => {
        students.forEach( item => {
            item.dataValues.type = 'student',
            item.dataValues.display = `${item.dataValues.last_name}, ${item.dataValues.first_name}`
        })
        res.send(students);
    })
});

/**
 * @function 
 * @param {Object} req client request object for creation of a new student record
 * @param {Object} res server response object with message
 * @returns {Object} message for client to display for user with status of create record
 */
router.post('/add', (req, res) => {
    const resp = {
        student: {
            created: null,
            student: null
        },
        history: {
            created: null,
            history: null
        }
    }
    Students
    .findOrCreate({where: {
        first_name: req.body.vals.first_name,
        last_name: req.body.vals.last_name,
        student_id: req.body.vals.student_id,
        fb_id: req.body.fb_id
        }
    })
    .spread( (student, created) => {
        resp.student.created = created;
        resp.student.student = student;
        /**add to history table after success for user activity feed */
        User_History
        .findOrCreate({ where: {
            fb_id: req.body.fb_id,
            transaction: `Added student ${req.body.vals.first_name} ${req.body.vals.last_name}`
        }})
        .spread( (history, created) => {
            res.status(200).send({msg: history.transaction})
        })
    })
})

module.exports = router;