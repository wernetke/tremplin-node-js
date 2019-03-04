var express = require('express');
var router = express.Router();
const session = require('express-session');
let options = {
    name: 'Cookie',
    secret: 'cookiesecret'
    //etc
}
router.use(session(options));

router.get('/',function(req,res){
    console.log("logout");
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) return console.log(err);
            return res.redirect('/login');
        });
    }

});

module.exports = router;
