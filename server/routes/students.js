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
        students.forEach( item => item.students.type = 'student')
        console.log('this is the students im sending the front', students[0])        
        res.send(students);
    })
});


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
    })

    User_History
    .findOrCreate({ where: {
        fb_id: req.body.fb_id,
        transaction: `Added student ${req.body.vals.first_name} ${req.body.vals.last_name}`
    }})
    .spread( (history, created) => {
        resp.history.created = created;
        resp.history.history = history
        res.status(200).send(resp)
    })
})

router.put('/update', (req, res) => {
    Students
    .update( 
        {first_name: req.body.update_data.update_first_name,
        last_name: req.body.update_data.update_last_name},
        {where: {
            id: req.body.update_data.id
        }})
    .spread( (affectedCount, affectedRows) => {
        Students
        .findAll({ where: {
            fb_id: req.body.update_data.fb_id
        }})
        .then( students => {
            res.status(200).send({affectedCount, affectedRows, students})
        })
    })
})



module.exports = router;