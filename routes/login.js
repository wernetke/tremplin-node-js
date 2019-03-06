const express = require('express');
const router = express.Router();
const database =require('../services/sequelize');
const bcrypt = require('bcrypt');

router.get('/', function(req,res){
    console.log("sign_up");
        res.render('login',{title: "Sign in"});
});



router.post('/signSave', function (req,res){

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
            sess.role=userLogin.role;
            res.redirect('/index');

        }

    });
});

module.exports = router;
