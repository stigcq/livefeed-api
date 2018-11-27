var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
console.log(process.env.DOTENV_HELLO);

var submitMessageRouter = require('./routes/submitMessage');
var submitCommentRouter = require('./routes/submitComment');

//maybe consider do a delete object function instead, which
//handles all types of deletion.
var deleteMessageRouter = require('./routes/deleteMessage');
var deleteMediaRouter = require('./routes/deleteMedia');
var deleteFeedRouter = require('./routes/deleteFeed');
var deleteUserRouter = require('./routes/deleteUser');

var getMessageRouter = require('./routes/getMessage');
var getCommentsRouter = require('./routes/getComments');
var getCommentCountRouter = require('./routes/getCommentCount');
var getMessagesRouter = require('./routes/getMessages');
var createUserRouter = require('./routes/createUser');
var createFeedRouter = require('./routes/createFeed');
var loginRouter = require('./routes/login');
var checkUserRouter = require('./routes/checkUserLoggedIn');
var getFeedRouter = require('./routes/getFeed');
var getUserFeedsRouter = require('./routes/getUserFeeds');
var addMediaRouter = require('./routes/addMedia');
var setAvatarRouter = require('./routes/setAvatar');
var getMediaRouter = require('./routes/getMedia');
var setDisplayNameRouter = require('./routes/setDisplayName');
var getUserMediaRouter = require('./routes/getUserMedia');
var sessionCheckRouter = require('./routes/isSessionValid');



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
app.use('/get_media', getMediaRouter);
app.use('/get_user_media', getUserMediaRouter);
app.use('/delete_message', deleteMessageRouter);
app.use('/delete_media', deleteMediaRouter);
app.use('/delete_feed', deleteFeedRouter);
app.use('/delete_user', deleteUserRouter);
app.use('/messages', getMessagesRouter);
app.use('/comments', getCommentsRouter);
app.use('/create_user', createUserRouter);
app.use('/create_feed', createFeedRouter);
app.use('/get_feed', getFeedRouter);
app.use('/get_user_feeds', getUserFeedsRouter);
app.use('/login', loginRouter);
app.use('/comment_counts', getCommentCountRouter);
app.use('/add_media', addMediaRouter);
app.use('/set_avatar', setAvatarRouter);
app.use('/set_display_name', setDisplayNameRouter);
app.use('/is_session_valid', sessionCheckRouter);



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
