const mysql = require('mysql');
const my_creds = require('./mysqlCredentials');

const connection = mysql.createConnection(my_creds);

var data = 'still a string';

connection.connect(function(err) {
    if (err) throw err
    connection.query("SELECT * FROM nodejs", handle_query)

    function handle_query(err, rows, fields) {
        if(err) throw err
        console.log(JSON.stringify(rows));
        data = JSON.stringify(rows)
        console.log(data)
    }
});

console.log(data);
// handle_query(err, rows, fields) {
//     if (err) throw err
//     return rows
// };
//
// connection.query("SELECT * FROM nodejs", handle_query);


module.exports = data;