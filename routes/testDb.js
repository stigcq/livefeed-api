var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient

console.log('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@localhost:27017');

MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@localhost:27017', function (err, client) {
  if (err) throw err

  var db = client.db('livefeed-api');

  /*db.collection('message').find().toArray(function (err, result) {
      if (err) throw err
  
      console.log(result)
    });*/

    db.createCollection("message", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
      });
  
});

/*  */
router.get('/', function(req, res, next) {
  res.send('respond with a resource test');
});

module.exports = router;
