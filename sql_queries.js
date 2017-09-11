// const mysql = require('mysql');
// const my_creds = require('./mysqlCredentials');
//
// const connection = mysql.createConnection(my_creds);
//
// var data = 'still a string';
// var select = "SELECT * FROM nodejs";
//
// connection.connect(function(err) {
//     if (err) throw err;
//     connection.query(select, handle_query);
//
//     function handle_query(err, rows, fields) {
//         if(err) throw err;
//         data = JSON.stringify(rows);
//         console.log('here is the data', data)
//     }
// });
//
// console.log(data);
//
// module.exports = data;

const express = require('express');
const mysql = require('mysql');
const credentials = require('./mysqlCredentials');

const router = express.Router();


router.get('/', function(req, res) {
    const connection = mysql.createConnection(credentials);
    var data = 'still a string';
    var select = "SELECT * FROM nodejs";

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(select, handle_query);

        function handle_query(err, rows, fields) {
            if(err) throw err;
            data = JSON.stringify(rows);
            console.log('here is the data', data)
        }
    });
});


module.exports = router;