var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

/*  */
router.get('/:feed_id/:test1?/:test2?', function(req, res, next) {

    const feed_id = req.params.feed_id;
    
    console.log(req.params.test1);
    console.log(req.params.test2);

    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        var mysort = { feed_time: -1 };
        
        db.collection("message").find({"feed_id": feed_id}).sort(mysort).toArray(function(err, result) {
            if (err) throw err;
            console.log("No rows found: " + result.length);
            client.close();

            res.send(JSON.stringify(result));
          });
    });

});

module.exports = router;
