const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
let Students = models.students;
let User_History = models.history;
let Grades = models.grades;

router.use(bodyParser.json())

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


router.post('/add', (req, res) => {
    console.log('this is the request body from update', req.body)    
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