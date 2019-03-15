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
        this.models.article=require('../model/article')(this.sequelize, this.models, type);
        this.models.category=require('../model/category')(this.sequelize, this.models, type);
        this.models.tag=require('../model/tag')(this.sequelize, this.models, type);
        this.models.commentary=require('../model/commentary')(this.sequelize, this.models, type);
        this.models.articleTag=require('../model/articleTag')(this.sequelize, this.models, type);


        this.models.article.associate(this.models);
        this.models.tag.associate(this.models);
        this.models.commentary.associate(this.models);



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