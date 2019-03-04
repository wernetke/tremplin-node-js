var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require ('./routes/login');
var logoutRouter = require ('./routes/logout');


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/loginSave', loginRouter);
app.use('/registration', registerRouter);
app.use('/enableAccount', registerRouter);

//session
let options = {
    name: 'Cookie',
    secret: 'cookiesecret'
    //etc
}
app.use(session(options));

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
