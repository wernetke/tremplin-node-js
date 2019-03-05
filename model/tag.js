'Tag strict';
module.exports = (sequelize, models, DataTypes) => {
    var Tag = sequelize.define('Tag', {
        name: DataTypes.STRING,
        articleID: DataTypes.INTEGER
    });

    Tag.associate = function(models) {
        Tag.hasMany(models.tag, {
            foreignKey: 'id',
            sourceKey: 'articleID'
        });
    };


    return Tag;
};