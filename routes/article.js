const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const database =require('../services/sequelize');
const validator = require('validator');

router.use(fileUpload());



router.get('/', function(req,res){
    console.log("ok");
    return database.models.article.findAll().then( (select_article) => {

        res.render('admin/article', {success: 'Update with success',title:'List of article' , select_article});
    });
});

router.get('/newArticle', function(req,res){
    console.log("newArticle");
    return database.models.category.findAll().then( (select_category) => {

        res.render('admin/newArticle', {title: 'Create an article', select_category});
    });
});

router.post('/createTag', function(req,res){
    console.log("createTag");
    if ( !validator.isEmpty(req.body.tag)) {
        return database.models.tag.create({
            name: req.body.tag,
            raw:true

        }).then((tag) => {
            res.send({tag});
        });
    }



});

router.post('/deleteTag', function(req,res){
    console.log("deleteTag");
    const tagIDsend =  req.body.tagID;
     database.models.articleTag.destroy({
        where: {  tagID: req.body.tagID, articleID: req.body.articleID,}
    });
    res.send(tagIDsend);


});

router.post('/createArticle', function(req,res) {
    let  base64pictureArticle = Buffer.from(req.files.file.data).toString('base64');
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
        var data = req.body.tagloopid;


        return database.models.article.findAll({where: {title: req.body.title} }).then( (articleTitle) => {
            if (articleTitle.length < 1) {


               return database.models.article.create({
                    title: req.body.title,
                    description: req.body.desc,
                    CategoryId: req.body.categorySelect,
                    image: base64pictureArticle,
                    UserId: req.session.ID

                }).then( (articleTitleTag) => {
                       for (var i = 0, len = data.length; i < len; i++) {

                           database.models.articleTag.create({
                               articleID: articleTitleTag.articleID,
                               tagID: data[i]

                           });
                       }
                   return database.models.category.findAll().then( (select_category) => {

                    res.render('admin/newArticle', {success: 'Creation with success', select_category});

                   });
                });


            }
            else{

                return database.models.category.findAll().then( (select_category) => {

                res.render('admin/newCategory',{error: 'This article already exists', select_category} );
                });

            }
        });
    }

});



router.get('/updateArticle', function(req,res){
    console.log("updateArticle");
    return database.models.article.findAll({where: {articleID: req.query.id},include: [{ model: database.models.tag  }]}).then( articleTag => {
            const image = Buffer.from(articleTag[0].image, 'base64').toString('base64');
            articleTag[0].image = image;
            res.render('admin/updateArticle', {titleArt: 'Update article', titleArtDesc: "Please enter informations to update article", articleTag });
    });
});

router.post('/articleUpdated', function(req,res){
    console.log("articleUpdated");

    if ( (validator.isEmpty(req.body.desc) || validator.isEmpty(req.body.titre)) ) {
        console.log("articleUpdated");
        return database.models.article.findAll({
            where: {articleID: req.body.articleID},
            include: [{model: database.models.tag}]
        }).then(articleTag => {
            const image = Buffer.from(articleTag[0].image, 'base64').toString('base64');
            articleTag[0].image = image;

            if (validator.isEmpty(req.body.titre)) {

                res.render('admin/updateArticle', {titleArt: 'Update article',  titleArtDesc: "Please enter informations to update article", error: 'Title is empty', articleTag});
            }
            else if (validator.isEmpty(req.body.desc)) {
                res.render('admin/updateArticle', {titleArt: 'Update article', titleArtDesc: "Please enter informations to update article",  error: 'Description is empty', articleTag});
            }
        });
    }
    else{

        console.log("current updated");
        let base64pictureArticle;
        if(req.files.file) {
            base64pictureArticle = Buffer.from(req.files.file.data).toString('base64');
        }else{

            base64pictureArticle = req.body.imageDISP;
        }

        database.models.article.update({
            title: req.body.titre,
            description: req.body.desc,
            image: base64pictureArticle,
            userID: req.session.ID
        },{
            where: { articleID: req.body.articleID}
        });
        if(!validator.isEmpty(req.body.tag)){

            var data = req.body.tagloopid;

            for (var i = 0, len = data.length; i < len; i++) {

                database.models.articleTag.create({
                    articleID: req.body.articleID,
                    tagID: data[i]

                });
            }
        }

        res.render('admin/updateArticle', {titleArt: 'Update article', success: 'Article is updated'});


    };
});

router.get('/deleteArticle', function(req,res){
    console.log("articleUpdated");
    database.models.articleTag.destroy({
        where: {  articleID: req.query.id}
    });
    database.models.article.destroy({
        where: {  articleID: req.query.id}
    });
    res.redirect('/article');

});


router.post('/createComm', function(req,res){
    console.log("createComm");
    if ( !validator.isEmpty(req.body.comment)) {
        return database.models.commentary.create({
            description: req.body.comment,
            UserId: req.session.ID,
            ArticleArticleID: req.body.art_id,
            raw:true

        }).then((comment) => {
            res.send({comment});
        });
    }



});


module.exports = router;
