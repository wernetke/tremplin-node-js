'Article strict';
module.exports = (sequelize, models, DataTypes) => {
    var Article = sequelize.define('Article', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.TEXT,
        userID: DataTypes.INTEGER,
        categoryID: DataTypes.INTEGER



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

    };
    return Article;
};