module.exports = (sequelize, DataTypes) => {
    const Grades = sequelize.define('grades', {
        student_id: DataTypes.BIGINT,
        course_id: DataTypes.BIGINT,
        grade: DataTypes.INTEGER,
    }, 
    {
        timestamps: false,
        freezeTableName: true
    })
    return Grades
}