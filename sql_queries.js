// const express = require('express');
// const mysql = require('mysql');
// const credentials = require('./mysqlCredentials');
//
// const router = express.Router();
//
// router.get('/', function(req, res) {
//     const connection = mysql.createConnection(credentials);
//     var data = 'still a string';
//     var select = "SELECT * FROM nodejs";
//
//     connection.connect(function(err) {
//         if (err) throw err;
//         connection.query(select, handle_query);
//
//         function handle_query(err, rows, fields) {
//             if(err) throw err;
//             res.send(JSON.stringify(rows))
//         }
//     });
// });
//
//
// module.exports = router;
const Sequelize = require('sequelize');
// const my_creds = require('./mysqlCredentials');

const connection = new Sequelize('nodejs_test', 'root', 'nov121946', {
    host: 'localhost',
    dialect: 'mysql'
});

// const Cars = connection.define('nodejs2', {
//     car: Sequelize.STRING,
//     car_year: Sequelize.INTEGER,
// });

const Games = connection.define('node', {
    id: {
    type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    video_game: Sequelize.STRING,
    system: Sequelize.STRING,

    // freezeTableName: true
});




// const Users = connection.define('nodejs', {
//     Firstname: Sequelize.STRING,
//     Lastname: Sequelize.STRING,
//     Address: Sequelize.STRING,
// });
var data = connection.sync().then( function() {
    Games.findAll().then(function(game) {
        console.log('inside now')
        return JSON.stringify(game)
    })
});




