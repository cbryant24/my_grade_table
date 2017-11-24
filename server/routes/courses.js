/**@module courses_route */


const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
let Courses = models.courses;
let Assignments = models.assignments
let User_History = models.history

router.use(bodyParser.json());

/**
 * @function 
 * @param {Object} req client request object for data from the database courses table 
 * @param {Object} res server response object with associated user courses from database courses table
 * @returns {Array} of data objects from the courses table that are associated with user requester
 */

router.post('/', (req, res) => {
    Courses
    .findAll({ where: {
        fb_id: req.body.fb_id,
    }})
    .then( courses => {
        courses.forEach( item => {
            item.dataValues.display = item.dataValues.course_name,
            item.dataValues.type = 'course'
        })
        return res.status(200).send(courses)

    })
})

/**
 * @function 
 * @param {Object} req client request object to post data to the database courses table 
 * @param {Object} res server response object with response message for user
 * @returns {Object} with response for client to display for user
 */
router.post('/add', (req, res) => {
    Courses
    .findOrCreate( { where: {
        fb_id: req.body.fb_id,
        course_name: req.body.vals.course
    }})
    .spread( (course, course_created) => {
        /**add to history table after success for user activity feed */
        User_History
        .findOrCreate({ where: {
            fb_id: req.body.fb_id,
            transaction: `Added Course ${req.body.vals.course}`
        }})
        .spread( (history, created) => {
            res.status(200).send({msg: history.transaction})
        })
    })
})


/**
 * @function 
 * @param {Object} req client request object for data from the database courses table 
 * @param {Object} res server response object with database record
 * @returns {Object} with single database course record client requested
 */
router.post('/get-info', (req, res) => {
    console.log('this is the req object from get info', req.body)    
    Courses.
    findById(req.body.data).then( course => {
        console.log('this is the course object from get infog', course)
        res.status(200).send(course)
      })
})

module.exports = router;