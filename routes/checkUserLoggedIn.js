var express = require('express');
var router = express.Router();
var authLayer = require('./../lib/AuthLayer');

/* Currently set on all routes */
router.all('*', function(req, res, next) {

  var session_token = req.body.session_token;

  if(session_token == undefined)
    session_token = req.params.session_token;

  if(session_token == undefined) {
    req.app.set("user", false);
    next();

  } else {

    authLayer.findUserSession(session_token, function(user) {

      //user is either object or false if none found
      req.app.set("user", user);
      next();
    });
  }
    

});

module.exports = router;
