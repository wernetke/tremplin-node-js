const Sequelize = require('sequelize');
const type = require('sequelize/lib/data-types');

const databaseService = {
    models: {},
    sequelize : new Sequelize('tremplin_kwe', 'tremplin_kwe', 'allezlelosc', {

        host: 'postgres.ecocea.com',
        operatorsAliases: false,
        dialect: 'postgres'
    }),
    init(){

        this.models.user=require('../model/user')(this.sequelize, this.models, type);
       /* this.models.user=require('../models/user')(this.sequelize, this.models, type);
        this.models.category=require('../models/category')(this.sequelize, this.models, type);
        this.models.tag=require('../models/tag')(this.sequelize, this.models, type);
        this.models.comment=require('../models/comment')(this.sequelize, this.models, type);*/





        return this.sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch((err) => {
                console.log('Unable to connect to the database:', err);
            });
    }
};

module.exports = databaseService;