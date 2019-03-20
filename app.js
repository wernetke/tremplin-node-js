var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require ('./routes/login');
const logoutRouter = require ('./routes/logout');
const articleRouter =  require ('./routes/article');
const categoryRouter =  require ('./routes/category');
const userRouter =  require ('./routes/users');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');




var app = express();




let options = {
    name: 'Cookie',
    secret: 'cookiesecret',
    cookie: { maxAge: 60000 }
    //etc
}
app.use(session(options));





app.use(checkConnexion);
app.use(checkAdmin);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/registration', registerRouter);
app.use('/enableAccount', registerRouter);
app.use('/category', categoryRouter);
app.use('/article', articleRouter);
app.use('/admin', indexRouter);
app.use('/dashboard', userRouter);



Handlebars.registerHelper('debug', function(optionalValue){

    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
    }
});
Handlebars.registerHelper('user', function(buttonValue, compareup, compareupAll, options){
    console.log("register user");
    if (buttonValue === compareup)
    {
        return options.fn(this);
    }
    else if (buttonValue === compareupAll){
        return options.fn(this);
    }

});







//sequelize
const database = require('./services/sequelize');
database.init().then(()=> {
    const port = 8000;
    database.sequelize.sync().then( () => {
        app.listen(port, () => {
            console.log(`Running on http://localhost:${port}`)
        });
    });
});


function checkConnexion(req,res,next){

    if (typeof req.session.username === 'undefined') {

        app.locals.checkconnexion = false;
        next();
    }
    else{
        app.locals.hello = req.session.username;
        app.locals.checkconnexion = true;
        app.locals.choucroute= true;
        next();
    }
}

function checkAdmin(req,res,next){


    if(req.session.role === 1){
        app.locals.checkAdmin = true;
        next();
    }
    else{
        app.locals.checkAdmin = false;
        next();
    }
}




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
