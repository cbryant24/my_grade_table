module.exports = (sequelize, dataType) => {
    const Instructors = sequelize.define('instructors',{
        name: dataType.STRING
    },{
        timestamps: false,
        freezeTableName: true
    }
)
return Instructors
}