const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
let Courses = models.courses;


router.use(bodyParser.json());

router.post('/', (req, res) => {
    if(!req.body.course) {
        Courses
        .findAll({ where: {
            fb_id: req.body.fb_id,
        }})
        .then( courses => {
            res.status(200).send(courses)
        })
        return
    }
})

router.post('/search', (req, res) => {
    Courses
    .findAll({ where: {
        fb_id: req.body.fb_id,
        course_name: req.body.course
    }})
    .then( course => {
        res.status(200).send(course)
    })
})

router.post('/add', (req, res) => {
    Courses
    .findOrCreate( { where: {
        fb_id: req.body.fb_id,
        course_name: req.body.vals.course
    }})
    .spread( (course, created) => {
        res.status(200).send( {course, created})
    })
})

module.exports = router;