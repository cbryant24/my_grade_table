/**@module grades_table */

/**
 * model of history sql database table using library sequelize
 */

module.exports = (sequelize, DataTypes) => {
    const User_History = sequelize.define('history', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fb_id: DataTypes.BIGINT(20),
        transaction: DataTypes.STRING,
    }, 
    {
        timestamps: false,
        freezeTableName: true
    })
    return User_History 
}