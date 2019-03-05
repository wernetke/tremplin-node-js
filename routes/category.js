const express = require('express');
const router = express.Router();
const database =require('../services/sequelize');

router.get('/', function(req,res){
    res.render('/admin/category', { title: 'List of category'});
});

module.exports = router;