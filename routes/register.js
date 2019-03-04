var express = require('express');
var router = express.Router();
var database =require('../services/sequelize');
var functions = require ('../controller/sendMail');
const bcrypt = require('bcrypt');



router.get('/', function(req,res){
     res.render('register', { title: 'registration' });
});

router.post('/', function(req, res) {



    return database.models.user.findAll({where: {username: req.body.username} }).then( (users) => {
        console.log(typeof users.length);
        if(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(req.body.password)) {

            if (users.length < 1) {

                var random = functions.randomValueHex(12);
                database.models.user.create({
                    name: req.body.name,
                    firstname: req.body.firstname,
                    email: req.body.email,
                    password:bcrypt.hashSync(req.body.password, 10),
                    username: req.body.username,
                    active: 0,
                    role: 0,
                    token: random
                });
                functions.sendEmail(req.body.email, random, req.body.username);
                res.render('registerSucceed');
            }
            else {
                res.render('register', {error: 'Username is already use, please choose an other'});
            }
        }
        else {
            res.render('register', {error: 'Passwords must be  ' +
                ' * - At least 8 characters long, max length anything' +
                ' * - Include at least 1 lowercase letter' +
                ' * - 1 capital letter' +
                ' * - 1 number' +
                ' * - 1 special character => !@#$%^&* '});
        }
    });





});

router.get('/enableAccount/:token/:username', function (req, res) {
    return database.models.user.findOne({where: {username: req.params.username} }).then( (user) => {
        let token1= user.token;
        let token2 =  req.params.token;
        token1 =token1.replace(/\s+/g, '');
        token2 = token2.replace(/\s+/g, '');

        if (token1 === token2)
        {
            console.log( "update active");


            database.models.user.update({
                active: 1
            },{
                where: { username: req.params.username}
                });
            res.render('enableAccount');
        }
        else{
            res.render('enableAccount', {error: 'An error has been meet, please refresh the page'});
        }
    });




});

module.exports = router;
