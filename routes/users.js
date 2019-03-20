const express = require('express');
const router = express.Router();
const database = require('../services/sequelize');

router.get('/', function (req, res) {
    if (typeof req.session.username === 'undefined') {
        res.redirect('/index');

    }
    else{
        return database.models.user.findOne({where: {username: req.session.username},}).then(userInfo => {

            res.render('dashboard', {title: "Your informations:", userInfo});
        });
    }


});


router.post('/upSimple', function (req, res) {
    const valueButton = req.body.butt;
    console.log(valueButton);
    return database.models.user.findOne({where: {username: req.session.username},}).then(userInfo => {

        res.render('updateUser', {title: "Your informations:", valueButton, userInfo});
    });
});
router.post('/updatedSimple', function (req, res) {
    const valueButton = req.body.button;
    console.log(valueButton);
    return database.models.user.findOne({where: {username: req.session.username},}).then(userInfoSession => {

        if (valueButton === "1" || valueButton === "5") {
            console.log("user updated session");
            if (req.body.username != req.session.username) {
                return database.models.user.findAll({where: {username: req.body.username},}).then(userInfo => {

                    if (userInfo.length > 0) {

                            res.render('updateUser', {
                                title: "Your informations:",
                                error: "Your username is already used",
                                valueButton,
                                userInfoSession
                            });
                    }
                    else {
                        database.models.user.update({
                            username: req.body.username,
                            firstname: req.body.firstname,
                            name: req.body.lastname,
                            email: req.body.email
                        }, {
                            where: {username: req.session.username}
                        });
                        req.session.username=req.body.username;
                        req.session.save();


                        res.redirect('/dashboard');
                    }

                });

            }
        } else {
            database.models.user.update({
                username: req.body.username,
                firstname: req.body.firstname,
                name: req.body.lastname,
                email: req.body.email
            }, {
                where: {username: req.session.username}
            });

            res.redirect('/dashboard');
        }
    });
});


module.exports = router;
