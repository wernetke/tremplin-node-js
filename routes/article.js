const express = require('express');
const router = express.Router();
const database =require('../services/sequelize');

router.get('/', function(req,res){
    res.render('/admin/article', { title: 'List of article' });
});

module.exports = router;
