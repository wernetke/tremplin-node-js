var express = require('express');
var router = express.Router();
var session = require('express-session');
var database =require('../services/sequelize');
const bcrypt = require('bcrypt');
router.use(session({secret: 'ssshhhhh'}));



router.get('/', function(req,res){
    res.render('login', { title: 'Sign in' });
});



router.post('/', function (req,res){
    return database.models.user.findOne({where: {username: req.body.username} }).then( (userLogin) => {



        if (userLogin.length < 1)
        {
            res.render('login', {error: 'Your username is wrong'});

        }
        else if(!bcrypt.compareSync(req.body.password, userLogin.password))
        {
            res.render('login', {error: 'Your password is wrong'});
        }
        else if(userLogin.active === 0)
        {
            res.render('login', {error: 'Your account is not enabled'});
        }
        else{
            //create session

            var sess=req.session;
            sess.username=req.body.username;

            res.render('sign_in');

        }

    });
});

module.exports = router;
