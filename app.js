var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
console.log(process.env.DOTENV_HELLO);

var submitMessageRouter = require('./routes/submitMessage');
var submitCommentRouter = require('./routes/submitComment');
var deleteMessageRouter = require('./routes/deleteMessage');
var getMessageRouter = require('./routes/getMessage');
var getCommentsRouter = require('./routes/getComments');
var getCommentCountRouter = require('./routes/getCommentCount');
var getFeedRouter = require('./routes/getFeed');
var createUserRouter = require('./routes/createUser');
var createFeedRouter = require('./routes/createFeed');
var loginRouter = require('./routes/login');
var checkUserRouter = require('./routes/checkUserLoggedIn');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//enable cross browser
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.all('*', checkUserRouter);

app.use('/submit_message', submitMessageRouter);
app.use('/submit_comment', submitCommentRouter);
app.use('/get_message', getMessageRouter);
app.use('/delete_message', deleteMessageRouter);
app.use('/messages', getFeedRouter);
app.use('/comments', getCommentsRouter);
app.use('/create_user', createUserRouter);
app.use('/create_feed', createFeedRouter);
app.use('/login', loginRouter);
app.use('/comment_counts', getCommentCountRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {

  //TODO: this probably dont work or should be changed to respond with a json with error message
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
