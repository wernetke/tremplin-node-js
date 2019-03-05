var express = require('express');
var router = express.Router();


router.get('/',function(req,res){
    console.log("logout");
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) return console.log(err);
            return res.redirect('/index');
        });
    }

});

module.exports = router;
