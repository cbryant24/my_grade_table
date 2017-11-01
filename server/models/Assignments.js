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