const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
let Courses = models.courses;
let Assignments = models.assignments
let User_History = models.history


router.use(bodyParser.json());

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

// router.post('/search', (req, res) => {
//     Courses
//     .findAll({ where: {
//         fb_id: req.body.fb_id,
//         course_name: req.body.course
//     }})
//     .then( course => {
//         res.status(200).send(course)
//     })
// })

router.post('/add', (req, res) => {
    Courses
    .findOrCreate( { where: {
        fb_id: req.body.fb_id,
        course_name: req.body.vals.course
    }})
    .spread( (course, course_created) => {
        User_History
        .findOrCreate({ where: {
            fb_id: req.body.fb_id,
            transaction: `Added Course ${req.body.vals.course}`
        }})
        .spread( (history, created) => {
            res.status(200).send(history)
        })
    })
})

module.exports = router;