const express = require('express');


const students = require('./students');

const router = express.Router();

router.use('/students', students)





module.exports = router;