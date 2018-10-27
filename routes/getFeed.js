var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

/*  */
router.get('/:feed_id/:feed_time?/:goback?', function(req, res, next) {

    const feed_id = req.params.feed_id;
    var feed_time = 0;

    if(req.params.feed_time != undefined)
        feed_time = req.params.feed_time;
    
    console.log(req.params.feed_time);
    console.log(req.params.goback);

    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        var mysort = { feed_time: -1 };
        var aggregate = [
            {$match:
                {'feed_id': feed_id,
                "feed_time": {$gt: Number(feed_time) } } },
            { $lookup: {
              from: 'user',
              localField: 'user_id',
              foreignField: '_id',
              as: 'user'
            } },
            { $project: { "content": 1, "feed_time": 1,
                "user": { "display_name": 1 }
            } }
        ];
        
        db.collection("message").aggregate(aggregate).sort(mysort).toArray(function(err, result) {
            if (err) throw err;
            console.log("No rows found: " + result.length);
            client.close();

            result.reverse();

            result.forEach(function(item, index) {
                item.user = item.user[0];
            });

            res.send(JSON.stringify(result));
          });
    });

});

module.exports = router;
