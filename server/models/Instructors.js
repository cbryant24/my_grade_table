/**@module instructors */

/**
 * @function 
 * @param {object} sequelize 
 * @param {object} DataTypes 
 * @returns model of insturctors sql database table using npm library sequelize
 */

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