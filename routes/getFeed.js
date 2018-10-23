var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

/*  */
router.get('/', function(req, res, next) {

    const thread_id = req.params.thread_id;
    
    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@localhost:27017', function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        db.collection("message").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            client.close();

            res.send(JSON.stringify(result));
          });
    });

});

module.exports = router;
