const express = require('express');
const fs = require('fs');
const students = require('./models/students');
const Sequelize = require('sequelize');
const my_creds = require('./mysqlCredentials')

const app = express();
const sequelize = new Sequelize(my_creds.database, my_creds.user, my_creds.password, {
    host: my_creds.host, 
    dialect: my_creds.dialect

});
const student_tb = {};

student_tb.Games = sequelize.import(__dirname + '/models/students');
student_tb.sequelize = sequelize;

student_tb.sequelize.sync().then(function(){
    student_tb.Games.findAll().then(function(games){
        console.log(JSON.stringify(games))
    })
})

app.use('/assets', function(req, res, next){
    express.static(__dirname + '/public');
    next();
});

// app.use('/', select_routes);

app.get('/', function(req, res) {
    res.end( )
});



app.listen(3000);