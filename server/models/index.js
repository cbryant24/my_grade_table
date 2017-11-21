/**@module database_connection */


const fs = require('fs');
const Sequelize = require('sequelize');
const my_creds = require('../config/mysqlCredentials');

/**
 * @constructor 
 * creates a new sql database connection
 */
const sequelize = new Sequelize(my_creds.database, my_creds.user, my_creds.password, {
    host: my_creds.host, 
    dialect: my_creds.dialect, 
    define: {
        underscored: true
      }
});

/**
 * @type {object} 
 * object that will hold all instanses of the database tables and connection
 */
const grade_tbs = {};



/**
 * using fileserve create an array of the sql_database table models 
 * fileserve is used to pull the filenames out of a directory using filter ensuring it's not any hidden files or index files
 * each file path import this model into an variale and add that model to the sports_finder_tbls object
 */
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

/**
 * add the sequelize connection to the sql database in the object
 */
grade_tbs.sequelize = sequelize;
grade_tbs.Sequelize = Sequelize;

module.exports = grade_tbs;