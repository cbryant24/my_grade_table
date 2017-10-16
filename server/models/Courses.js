module.exports = (sequelize, dataTypes) => {
    const Courses = sequelize.define('courses', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING,
        instructor_id: dataTypes.INTEGER
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return Courses
}