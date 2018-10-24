var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient


/* GET home page. */
router.post('/', function(req, res, next) {

  const email = req.body.email;
  const md5password = req.body.md5password;

  MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
  '@' + process.env.DB_HOST + ':27017', function (err, client) {
  if (err) throw err

  var db = client.db('livefeed-api');

  db.collection("message").findOne({ password: md5password }, 
      function(err, ires) {
      if (err) throw err;

      if(ires != null) {
          console.log("1 user found id " + ires._id );
          
          res.send(JSON.stringify(ires));

          //create a token
          //update user row with token
          //send token to client in json
          //close db conn


      } else {
          console.log("no user found ");
          client.close();
          res.send("no user found");
      }

    });
  });

});

module.exports = router;
