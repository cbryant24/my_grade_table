module.exports = (sequelize, dataType) => {
    const Instructors = sequelize.define('users',{
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fb_id: dataType.BIGINT(20),        
        email: dataType.STRING,
        name: dataType.STRING
    },{
        timestamps: false,
        freezeTableName: true
    }
)
return Instructors
}