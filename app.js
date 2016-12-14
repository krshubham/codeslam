var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var api = require('./routes/api');
var compiler = require('./routes/compiler');
var verify = require('./routes/verify');
var faculty = require('./routes/faculty');
var admin = require('./routes/admin');
var app = express();
//Never ever require any package or install it through npm without mentioning in package.json




app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/verify', verify);
app.use('/faculty', faculty);
app.use('/api', api);
app.use('/code', compiler);
app.use('/admin',admin);
app.use('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'client', 'index.html'));
});



/*app.use(function(req, res, next) {
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
*/
/*protected routes*/
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.status(500).json({
//       message: err.message,
//       error: err
//     });
//   });
// }

//production error handler
//no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.status(500).json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
