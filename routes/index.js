const express = require('express');
const router = express.Router();
const database =require('../services/sequelize');


/* GET home page. */

    router.get('/', function (req, res) {

        return database.models.category.findAll().then( (category_display) => {

            res.render('index', {category_display});
        });

    });

    router.get('/adminArticle', function(req,res){
        console.log("ok");
        res.render('admin/article', {title: 'List of article'});
    });
    router.get('/adminCategory', function(req,res){
        return database.models.category.findAll().then( (select_category) => {

            res.render('admin/category', {title: 'List of category', select_category});
        });
    });






module.exports = router;
