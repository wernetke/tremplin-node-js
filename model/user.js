'use strict';
module.exports = (sequelize, models, DataTypes) => {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        firstname: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.INTEGER,
        token: DataTypes.STRING,
        active: DataTypes.INTEGER

    });



    return User;
};