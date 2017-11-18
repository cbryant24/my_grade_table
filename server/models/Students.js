module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define('students', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        student_id: DataTypes.BIGINT(20),
        fb_id: DataTypes.BIGINT(40)
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
    return Students;
}




// video_game: {
//     type: DataTypes.STRING,
//     validate: {
//         len: [2,20]
//     }
// }