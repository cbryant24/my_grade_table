const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
let Courses = models.courses;
let Students = models.students

router.use(bodyParser.json());

router.post('/', (req, res) => {
        const student_data = Students
        .findAll({ where: {
            fb_id: req.body.fb_id,
        }})
        .then( students => {
            students.forEach( item => {
                item.dataValues.display = `${item.dataValues.last_name}, ${item.dataValues.first_name}`,
                item.dataValues.type = 'student'
            })
            return students
        })

        const course_data = Courses
        .findAll({ where: {
            fb_id: req.body.fb_id,
        }})
        .then( courses => {
            courses.forEach( item => {
                item.dataValues.display = item.dataValues.course_name,
                item.dataValues.type = 'course'
            })
            return courses
        })
        Promise.all([course_data, student_data]).then( data => {
            res.status(200).send(data)
        })
    }
)

module.exports = router;


// (() => {
//     debugger
//     let all_vals = {};
//     const student_data = Students
//     .findAll({ where: {
//         fb_id: 309974059478128,
//     }})
//     .then( students => {
//         students.forEach( item => {
//             item.dataValues.display = `${item.dataValues.last_name}, ${item.dataValues.first_name}`,
//             item.dataValues.type = 'student'
//         })
//         return students
//     })

//     const course_data = Courses
//     .findAll({ where: {
//         fb_id: 309974059478128,
//     }})
//     .then( courses => {
//         courses.forEach( item => {
//             item.dataValues.display = item.dataValues.course_name,
//             item.dataValues.type = 'course'
//         })
//         return courses
//     })
//     return all_vals = Promise.all([course_data, student_data]).then( data => {
//         debugger
//         console.log('this be the data from promise all', data)
//         return data 
//     })
// })().then( data => {
//     debugger
//     console.log(data)
// })