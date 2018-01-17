/**@module courses_table */

/**
 * model of courses sql database table using npm library sequelize
 */

module.exports = (sequelize, dataTypes) => {
    const Courses = sequelize.define('courses', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fb_id: dataTypes.BIGINT(20),
        course_name: dataTypes.STRING,
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return Courses
}