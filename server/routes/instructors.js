const models = require('../models');
const express = require('express');
// const test = require('./test');

const router = express.Router();
let Instructors = models.users;

debugger

router.get('/', function(req, res){
    Instructors.findAll().then( (table) => {
        let instructors = {
            success: true,
            data: table
        }
        res.status(200)        
        res.send(instructors)
    })
    
    // res.send(JSON.stringify(table));
})



module.exports = router;