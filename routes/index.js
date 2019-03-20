const express = require('express');
const router = express.Router();
const database = require('../services/sequelize');


/* GET home page. */

router.get('/', function (req, res) {
    return database.models.article.findAll({include: [{model: database.models.tag}, {model: database.models.category}, {model: database.models.user}]}).then(articleTag => {


        return database.models.category.findAll().then((category_display) => {
            for (var i = 0, len = articleTag.length; i < len; i++) {
                const image = Buffer.from(articleTag[i].image, 'base64').toString('base64');
                articleTag[i].image = image;
            }

            res.render('index', {category_display, articleTag});
        });
    });

});

router.get('/adminArticle', function (req, res) {

    if (req.session.role === 1) {

        return database.models.article.findAll().then((select_article) => {
            for (var i = 0, len = select_article.length; i < len; i++) {
                const image = Buffer.from(select_article[i].image, 'base64').toString('base64');
                select_article[i].image = image;
                console.log(select_article[i].image);
            }


            res.render('admin/article', {title: 'List of article', select_article});
        });
    }
    else {

        res.redirect('/index');

    }
});
router.get('/adminCategory', function (req, res) {

    if (req.session.role === 1) {

        return database.models.category.findAll().then((select_category) => {

            res.render('admin/category', {title: 'List of category', select_category});
        });
    }
    else {

        res.redirect('/index');

    }
});


router.get('/display_article', function (req, res) {
    console.log("display_article");

    return database.models.article.findOne({
        where: {
            articleID: req.query.id
        },
        include:
            [{model: database.models.tag}, {model: database.models.category}, {model: database.models.user}]
    }).then(articleTag => {


        return database.models.category.findAll().then((category_display) => {
            for (var i = 0, len = articleTag.length; i < len; i++) {
                const image = Buffer.from(articleTag[i].image, 'base64').toString('base64');
                articleTag[i].image = image;
            }
            return database.models.commentary.findAll({
                where: {
                    ArticleArticleID: req.query.id
                },
                include:
                    [{model: database.models.user}]
            }).then(commentaryList => {


                res.render('articleFile', {category_display, articleTag, commentaryList});
            });
        });
    });
});

router.get('/categoryList', function (req, res) {

    return database.models.article.findAll({
        where: {
            CategoryId: req.query.id
        },
        include:
            [{model: database.models.tag}, {model: database.models.category}, {model: database.models.user}]
    }).then(articleTag => {
        return database.models.category.findAll().then((category_display) => {
            for (var i = 0, len = articleTag.length; i < len; i++) {
                const image = Buffer.from(articleTag[i].image, 'base64').toString('base64');
                articleTag[i].image = image;
            }
            res.render('articleCatList', {category_display, articleTag});
        });
    });
});

router.post('/search', function (req, res) {

    return database.models.article.findAll({
        where: {$or: {
                title:  {$like: '%' + req.body.Search + '%'},

                description: {$like: '%' + req.body.Search + '%'}
            }},
        include:
            [{model: database.models.tag}, {model: database.models.category}, {model: database.models.user}]
    }).then(articleFound => {
        return database.models.category.findAll().then((category_display) => {
            for (var i = 0, len = articleFound.length; i < len; i++) {
                const image = Buffer.from(articleFound[i].image, 'base64').toString('base64');
                articleFound[i].image = image;
            }
            res.render('resultSearchArticle', {category_display, articleFound});
        });
    });
});



module.exports = router;
