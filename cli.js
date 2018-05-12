var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var cli = express();

// view engine setup
cli.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
cli.use(favicon(path.join(__dirname, 'public', 'sangdragon.ico')));
cli.use(bodyParser.json());
cli.use(bodyParser.urlencoded({ extended: false }));
cli.use(cookieParser());
cli.use(express.static(path.join(__dirname, 'public/dist')));

// catch 404 and forward to error handler
cli.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
cli.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = cli;
