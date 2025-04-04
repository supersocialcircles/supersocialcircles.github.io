require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authentication');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRoutes);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/leaderboard', (req, res) => {
  const players = [
      { username: 'JohnDoe123', highScore: 300 },
      { username: 'JaneSmith', highScore: 250 },
      { username: 'CoolPlayer', highScore: 200 }
  ];
  res.render('leaderboard', { 
      title: 'Leaderboard',
      players
  });
});


var accountinfoRouter = require('./routes/accountinfo');
app.use('/accountinfo', accountinfoRouter);



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
