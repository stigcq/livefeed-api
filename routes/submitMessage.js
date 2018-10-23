var express = require('express');
var router = express.Router();

/*var MongoClient = require('mongodb').MongoClient

console.log('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@localhost:27017');

MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@localhost:27017', function (err, client) {
  if (err) throw err

  var db = client.db('livefeed-api');

    db.createCollection("message", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        client.close();
      });
  
});*/

/*  */
router.post('/', function(req, res, next) {
  res.send('Submit message ' + req.body.beer + " " + req.body.rating);
});

module.exports = router;
