var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

/*  */
router.get('/:feed_id/:feed_time?/:goback?', function(req, res, next) {

    const feed_id = req.params.feed_id;
    
    console.log(req.params.feed_time);
    console.log(req.params.goback);

    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        var myquery = {"feed_id": feed_id};

        if(req.params.feed_time != undefined) 
            myquery = {"feed_id": feed_id, "feed_time": {$gt: Number(req.params.feed_time)}};

        var mysort = { feed_time: -1 };
        
        db.collection("message").find(myquery).sort(mysort).toArray(function(err, result) {
            if (err) throw err;
            console.log("No rows found: " + result.length);
            client.close();

            res.send(JSON.stringify(result));
          });
    });

});

module.exports = router;
