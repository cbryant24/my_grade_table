module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define('students', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        created: DataTypes.DATE,
        modified: DataTypes.DATE
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