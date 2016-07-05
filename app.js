var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')(expressSession);
var mongo = require('./mongo');
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var app = express();

app.use(expressSession({
  secret: 'itsgeekthing',
  store : new  mongoStore({
    url: 'mongodb://localhost:27017/slam'
  })
}));

function ifLoggedIn(res,req,next){
  if(req.session.name){
    var coll = mongo.collections('users');
    coll.findOne({username: req.session.name},function(err,db){
      assert.equal(err,null);
      if(user){
        req.user = user;
        res.locals.user = user;
      }
      next();
    });
  }
  else{
    next();
  }
}


app.use(ifLoggedIn);





//Database setup
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/slam';
//Function for Database connection
function dbConnect(err,db){
  try{
    assert.equal(err,null);
    console.log('Connection established to ',url);
  }
  catch(err){
    console.log("Unable to connect with the database");
  }
  db.close();
}

mongo.connect(url,dbConnect);


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

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
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
