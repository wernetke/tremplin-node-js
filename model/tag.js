'Tag strict';
module.exports = (sequelize, models, DataTypes) => {
    var Tag = sequelize.define('Tag', {
        name: DataTypes.STRING,
        tagID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });

    Tag.associate = function(models) {

        Tag.belongsToMany(models.article, {
            through: models.articleTag,
            foreignKey: "tagID",
            otherKey: "articleID"

        });
    };


    return Tag;
};