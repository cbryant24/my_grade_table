const models = require('../models');
const express = require('express');
// const test = require('./test');

const router = express.Router();
let Students = models.students;
let Grades = models.grades;
debugger
router.get('/', function(req, res){
    Students.findAll().then( (table) => {
        let all_studs = {
            success: true,
            data: table
        }
        console.log(typeof JSON.stringify(table));
        res.status(200)        
        res.send(all_studs)
    } )
    console.log('hello everyone from students');
    // res.send(JSON.stringify(table));
})



module.exports = router;