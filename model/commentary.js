'Commentary strict';
module.exports = (sequelize, models, DataTypes) => {
    var Commentary = sequelize.define('Commentary', {
        description: DataTypes.STRING,
        userID: DataTypes.INTEGER,
        articleID: DataTypes.INTEGER



    });

    Commentary.associate = function(models) {
        Commentary.belongsTo(models.user, {
            foreignKey: 'id',
            sourceKey: 'userId'
        });
        Commentary.belongsTo(models.category, {
            foreignKey: 'id',
            sourceKey: 'articleID'
        });

    };
    return Commentary;
};