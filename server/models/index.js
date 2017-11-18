const fs = require('fs');
const Sequelize = require('sequelize');
const my_creds = require('../config/mysqlCredentials');

//creating the Object that can be used to access the database specified in the credintials file
const sequelize = new Sequelize(my_creds.database, my_creds.user, my_creds.password, {
    host: my_creds.host, 
    dialect: my_creds.dialect, 
    define: {
        underscored: true
      }
});

//object that will be exported with the ability to access each database table using Sequelize and table name
const grade_tbs = {};

// grade_tbs.Sequelize = sequelize.import(__dirname + '/Grades');
// grade_tbs.sequelize = sequelize;

//using fileserve create an array of the sql_database models (which are used to access every table of the database)
//fileserve is used pull the filenames out of a directory using filter ensuring it's not any hidden files or index files
//then for each file path import that ito model into a variable
//add that model to the grade_tbs object by name using the variable we just/had to create
fs.readdirSync(__dirname).
filter( (file) => file[0] !== '.' && file !== 'index.js' ).
forEach( (file) => {
    let model = sequelize.import(__dirname + '/' + file);
    grade_tbs[model.name] = model;
} )

Object.keys(grade_tbs).forEach(function(modelName) {
    if ("associate" in grade_tbs[modelName]) {
      grade_tbs[modelName].associate(grade_tbs);
    }
  });

//add the sequelize connection to the database in the object under the Sequelize name
grade_tbs.sequelize = sequelize;
grade_tbs.Sequelize = Sequelize;

// grade_tbs.Sequelize.sync().then(function(){
//     grade_tbs.courses.findAll().then( (table) => {
//         console.log(JSON.stringify(table))
//     })
// })

//export the object 
module.exports = grade_tbs;