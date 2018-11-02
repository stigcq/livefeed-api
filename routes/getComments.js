var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

/*  */
router.get('/:message_id', function(req, res, next) {

    const message_id = req.params.message_id;
    
    console.log("get comments for: " + message_id);

    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        var mysort = { feed_time: -1 };
        var aggregate = [
            { $match:
                {'reply_to': message_id } },
            { $lookup: {
              from: 'user',
              localField: 'user_id',
              foreignField: '_id',
              as: 'user'
            } },
            { "$unwind": "$user" },
            { $project: { "content": 1, "feed_time": 1,
                "user": { "display_name": 1, '_id': 1 }
            } }
        ];
        
        db.collection("message").aggregate(aggregate).sort(mysort).toArray(function(err, result) {
            if (err) throw err;
            console.log("No rows found: " + result.length);
            client.close();

            //result.reverse();

            /*result.forEach(function(item, index) {
                item.user = item.user[0];
            });*/

            res.send(JSON.stringify(result));
          });
    });

});

module.exports = router;
