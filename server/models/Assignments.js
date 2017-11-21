/**@module assignments_table */

/**
 * @function 
 * @param {object} sequelize 
 * @param {object} DataTypes 
 * @returns model of assignment sql database table using npm library sequelize
 */

module.exports = (sequelize, dataTypes) => {
    const Assignments = sequelize.define('assignments', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        assignment_name: dataTypes.STRING,
        course_id: dataTypes.INTEGER,
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return Assignments
}