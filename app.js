const express = require('express');
const select_query = require('./sql_queries')
const safeJsonStringify = require('safe-json-stringify');


const app = express();

app.use('/assets', function(req, res, next){
    express.static(__dirname + '/public');
    next();
});

app.get('/', function(req, res) {
    console.log(select_query)
    res.send(select_query)
    // res.end(JSON.stringify(select_query()));
});




app.listen(3000);