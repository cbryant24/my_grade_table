/**@module grades_table */

/**
 * @function 
 * @param {object} sequelize 
 * @param {object} DataTypes 
 * @returns model of grades sql database table using npm library sequelize
 */

module.exports = (sequelize, DataTypes) => {
    const Grades = sequelize.define('grades', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true
        },
        student_id: DataTypes.BIGINT,
        course_id: DataTypes.BIGINT,
        grade: DataTypes.INTEGER,
        assignment_id: DataTypes.STRING
    }, 
    {
        timestamps: false,
        freezeTableName: true
    })
    return Grades
}