var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var api = require('./routes/api')
var app = express();
var compiler = require('compilex');
//Never ever require any package or install it through npm without mentioning in package.jsona




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', auth);
app.use('*', function(req,res,next){
  res.sendFile(path.join(__dirname,'public','client','index.html'));
});



app.use(function(req, res, next) {
  var token = req.body.token || req.params.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {      
      if (err){
         res.redirect('/');    
     } else {
      req.decoded = decoded;
  }
});

} else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.'
  });
    
}
});

/*protected routes*/
app.use('/users', users);
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
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
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
    error: {}
});
});


module.exports = app;
