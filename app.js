const express = require('express');
const select_query = require('./sql_queries')
const safeJsonStringify = require('safe-json-stringify');
const select_routes = require('./sql_queries');


const app = express();

app.use('/assets', function(req, res, next){
    express.static(__dirname + '/public');
    next();
});

app.use('/', select_routes);

// app.get('/', function(req, res) {
//     console.log(select_query)
//     res.send(select_query)
//     // res.end(JSON.stringify(select_query()));
// });

app.get('/', function(req, res) {
    res.end( )
});



app.listen(3000);