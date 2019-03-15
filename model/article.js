'Article strict';
module.exports = (sequelize, models, DataTypes) => {
    var Article = sequelize.define('Article', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.TEXT,
        userID: DataTypes.INTEGER,
        categoryID: DataTypes.INTEGER,
        articleID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }



    });

    Article.associate = function(models) {
        Article.belongsTo(models.user, {
            foreignKey: 'id',
            sourceKey: 'userId'
        });
        Article.belongsTo(models.category, {
            foreignKey: 'id',
            sourceKey: 'categoryID'
        });
        Article.belongsToMany(models.tag, {
            through: models.articleTag,
            foreignKey: "articleID",
            otherKey: "tagID"
        });

    };
    return Article;
};