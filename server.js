// BASE SETUP
// =============================================================================

var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var config = require('./config');
var connection = mongoose.connect(config.get("mongoose:uri"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('superSecret', config.get("secret"));
app.use(session({ secret: config.get("secret") })); // session secret

var port = config.get("port") || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ROUTES
// =============================================================================

var router = express.Router();
var index = require("./routes/index");
var auth = require("./routes/auth");
var demo = require("./routes/demo");

router.use(function (req, res, next) {
    next();
});

// REGISTER OUR ROUTES -------------------------------
// =============================================================================

app.use('/', router)
    .use('/', index)
    .use('/auth/', auth)
    .use('/', demo)
    .use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.locals.pretty = true;
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            title: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        title: err.message,
        error: {}
    });
});

app.listen(port);
console.log('Magic happens on port ' + port);