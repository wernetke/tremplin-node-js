var express = require('express');
var router = express.Router();
var session = require('express-session');


router.get('/',function(req,res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.render('login');
        }
    });
});

module.exports = router;
