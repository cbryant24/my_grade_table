module.exports = (sequelize, DataTypes) => {
    const Games = sequelize.define('node', {
        video_game: {
            type: DataTypes.STRING,
            validate: {
                len: [2,20]
            }
        },
        system: DataTypes.STRING
        },
        {
            freezeTableName: true
        }
    );
    return Games;
}