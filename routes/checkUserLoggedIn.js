var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient

/* Currently set on all routes */
router.all('*', function(req, res, next) {

  var session_token = req.body.session_token;

  if(session_token == undefined)
    session_token = req.params.session_token;

  if(session_token == undefined) {
    req.app.set("user", false);
    next();
  } else {

    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
    '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
      
      if (err) throw err
  
      var db = client.db(process.env.DB_DB);
  
      db.collection("user").findOne({ 'session_token': session_token }, function(err, ires) {
        if (err) throw err;
  
        if(ires != null) {
            console.log("1 user found id " + ires._id );
  
            req.app.set("user", ires);
            next();
  
        } else {
          req.app.set("user", false);
          next();
        }
      });
  
    });
  }


});

module.exports = router;
