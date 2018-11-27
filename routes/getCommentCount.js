var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var mongodb = require("mongodb");

/*  */
router.get('/:feed_id', function(req, res, next) {

    const feed_id = req.params.feed_id;
    
    console.log("get comments for: " + feed_id);

    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        var mysort = { feed_time: -1 };
        var aggregate = null;
        
        if(feed_id == 0)
        aggregate = [
            {"$group" : { _id: '$reply_to', count: { $sum:1 } } },
            { $project: {  
                _id: 0,
                message_id: "$_id",
                count: 1
             }
          }       
        ];
        else {
            if(mongodb.ObjectID.isValid(feed_id) == false) {
                callback( {'error': 6, 'message': 'id is not a valid id' } );
                return;
            } else {
                aggregate = [
                    { $match:
                        {'feed_id': ObjectID(feed_id) } },
                    {"$group" : { _id: '$reply_to', count: { $sum:1 } } },
                    { $project: {  
                        _id: 0,
                        message_id: "$_id",
                        count: 1
                     }
                  }       
                ];
            }
        }
        
        
        db.collection("message").aggregate(aggregate).sort(mysort).toArray(function(err, result) {
            if (err) throw err;
            
            client.close();

            res.send(JSON.stringify(result));
          });
    });

});

module.exports = router;
