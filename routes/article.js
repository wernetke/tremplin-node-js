const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const database =require('../services/sequelize');
var validator = require('validator');
var multer = require("multer");
var functions = require ('../controller/base64file');

var upload = multer({
    dest: "../public/images"
});
router.use(fileUpload());


router.get('/', function(req,res){
        res.render('admin/article', {success: 'Update with success',title:'List of article' ,});
});

router.get('/newArticle', function(req,res){
    console.log("newArticle");
    return database.models.category.findAll().then( (select_category) => {

        res.render('admin/newArticle', {title: 'Create an article', select_category});
    });
});

router.post('/createArticle', function(req,res) {
    console.log(req.files.file.name);
    var base64pictureArticle = Buffer.from(req.files.file.data).toString('base64');
    console.log(base64pictureArticle);
    if ( validator.isEmpty(req.body.title)) {
        res.render('admin/newCategory', {error: 'Title is empty'});
    }
    else  if ( validator.isEmpty(req.body.desc)) {
        res.render('admin/newCategory', {error: 'Description is empty'});
    }
    else  if ( validator.isEmpty(req.files.file.name)) {
        res.render('admin/newCategory', {error: 'File is empty'});
    }
    else{
        console.log("creation");

        return database.models.article.findAll({where: {title: req.body.title} }).then( (articleTitle) => {
            if (articleTitle.length < 1) {

                database.models.article.create({
                    title: req.body.title,
                    desc: req.body.desc,
                    categoryID: req.body.categorySelect,
                    image: base64pictureArticle,
                    userID: req.session.ID

                });
                res.render('admin/newCategory', {success: 'Creation with success'});

            }
            else{
                res.render('admin/newCategory',{error: 'This article already exists'} );

            }
        });
    }

});

/*t('/updateArticle', function(req,res){

    return database.models.category.findOne({where: {name: req.body.categorySelect} }).then( categoryID => {
        console.log(categoryID);
        res.render('admin/updateArticle', {title: 'Update article',categoryID});
    });
});

*/

module.exports = router;
