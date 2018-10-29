var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');

/* Currently set on all routes */
router.all('*', function(req, res, next) {

  var session_token = req.body.session_token;

  if(session_token == undefined)
    session_token = req.params.session_token;

  if(session_token == undefined) {

    req.app.set("user", false);
    next();

  } else {

    dataLayer.findUserSession(session_token, function(user) {

      //user is either object or false if none found
      req.app.set("user", user);
      next();
    });
  }
    /*MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
    '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
      
      if (err) throw err
  
      var db = client.db(process.env.DB_DB);
  
      db.collection("user").findOne({ 'session_token': Number(session_token) }, function(err, ires) {
        if (err) throw err;
  
        if(ires != null) {
            console.log("1 user found id " + ires._id );
  
            req.app.set("user", ires);
            next();
  
        } else {
          console.log("no user found session_token " + session_token );
  
          req.app.set("user", false);
          next();
        }
      });
  
    });*/
  


});

module.exports = router;
