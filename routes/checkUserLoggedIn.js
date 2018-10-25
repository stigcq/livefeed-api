var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {

  const session_token = req.body.session_token;

  if(session_token == undefined)
    session_token = req.params.session_token;

  if(session_token == undefined) {
    req.app.set("user", false);
  } else {

    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
    '@' + process.env.DB_HOST + ':27017', function (err, client) {
    if (err) throw err
  
      var db = client.db('livefeed-api');
  
      db.collection("user").findOne({ 'session_token': session_token }, 
        function(err, ires) {
        if (err) throw err;
  
        if(ires != null) {
            console.log("1 user found id " + ires._id );
  
            req.app.set("user", ires);
  
        } else {
          req.app.set("user", false);
        }
      });
  
    });
  }

  next();
});

module.exports = router;
