'Category strict';
module.exports = (sequelize, models, DataTypes) => {
    var Category = sequelize.define('Category', {
        name: DataTypes.STRING
    });


    return Category;
};