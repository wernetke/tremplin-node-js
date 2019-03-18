'Commentary strict';
module.exports = (sequelize, models, DataTypes) => {
    var Commentary = sequelize.define('Commentary', {
        description: DataTypes.STRING,



    });

    Commentary.associate = function(models) {
        Commentary.belongsTo(models.user);/*, {
            foreignKey: 'id',
            sourceKey: 'userId'
        });*/
        Commentary.belongsTo(models.article);/*, {
            foreignKey: 'id',
            sourceKey: 'articleID'
        });*/

    };
    return Commentary;
};