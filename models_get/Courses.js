module.exports = (sequelize, dataTypes) => {
    const Courses = sequelize.define('courses', {
        name: dataTypes.STRING,
        instructor_id: dataTypes.INTEGER
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return Courses
}