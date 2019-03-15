const express = require('express');
const router = express.Router();
const database =require('../services/sequelize');
var validator = require('validator');



router.get('/', function(req,res){
    return database.models.category.findAll().then( (select_category) => {

        res.render('admin/category', {success: 'Update with success',title:'List of category' ,select_category});
    });
});


router.get('/newCategory', function(req,res){

    res.render('admin/newCategory', { title: 'Create a category'});
});

router.post('/updateCategory', function(req,res){
    console.log(req.body.butt);

    if(req.body.butt === "1") {

        return database.models.category.findOne({where: {id: req.body.categorySelect} }).then( categoryID => {
            console.log(categoryID);
            res.render('admin/updateCategory', {title: 'Update category',categoryID});
        });

    }
    else if (req.body.butt === "2") {


        return database.models.article.findAll({where: {categoryID: req.body.categorySelect} }).then( articleFind => {

            if (articleFind.length > 0)
            {

                return database.models.category.findAll().then( (select_category) => {
                    res.render('admin/category', {error: 'There are still article associated to this category, please to delete article before delete this category',title:'List of category' ,select_category});
                });


            }else{
                database.models.category.destroy({
                    where: {  id: req.body.categorySelect}
                });
                res.redirect('/category');

            }

        });

    }
});

router.post('/updateCategoryConfirm', function(req,res){

    if ( !validator.isEmpty(req.body.name))
    {
        database.models.category.update({
            name: req.body.name
        },{
            where: { id: req.body.id}
        });

        res.redirect('/category');


    }
    else{
        res.render('admin/updateCategoryConfirm',{error: 'Update is not working'} );

    }


});

router.post('/createCategory', function(req,res) {

    if ( !validator.isEmpty(req.body.name)) {
        return database.models.category.findAll({where: {name: req.body.name} }).then( (category) => {
            if (category.length < 1) {
                database.models.category.create({
                    name: req.body.name

                });
                res.render('admin/newCategory', {title: 'Create a category', success: 'Creation with success'});

            }
            else{
                res.render('admin/newCategory',{error: 'This category already exists'} );

            }
        });
    }
    else{
        res.render('admin/newCategory',{error: 'Creation is not working'} );

    }
});




module.exports = router;