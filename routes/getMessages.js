var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

/*  */
router.get('/:feed_id/:feed_time?/:goback?', function(req, res, next) {

    const feed_id = req.params.feed_id;
    var feed_time = 0;
    var sortOrder = -1;
    var goBack = 0;

    if(req.params.feed_time != undefined)
        feed_time = req.params.feed_time;
    
    if(req.params.goback != undefined)
        goBack = req.params.goback;

    //if(goBack == 1)
    //    sortOrder = 1;
   
    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        //var mysort = { feed_time: 1 };
        var aggregate = null;
        
        //FIXME: cant figure out how to manipulate this object 
        
        var hmmtest = {$gt: Number(feed_time) };
        if(goBack == 1)
            hmmtest = {$lt: Number(feed_time) };

        if(feed_id == 0)
         aggregate = [
            {$match:
                {'reply_to': 0,
                "feed_time":  hmmtest} },
            { $lookup: {
              from: 'user',
              localField: 'user_id',
              foreignField: '_id',
              as: 'user'
            } },
            { "$unwind": "$user" },
            { $lookup: {
                from: 'media',
                localField: '_id',
                foreignField: 'message_id',
                as: 'photos'
              } },
            { $project: { "content": 1, "feed_time": 1, "feed_id": 1, "feed_title": 1,
                "id": "$_id", "_id": 0,
                "user": { "display_name": 1, "id": "$user._id", 'avatar_url': 1 },
                "photos": { "media_url": 1 }
            } },
            { $sort : { feed_time : sortOrder } },
            { $limit : 30 }
        ];
        else
        aggregate = [
            {$match:
                {'feed_id': ObjectID(feed_id),
                'reply_to': 0,
                "feed_time": hmmtest } },
            { $lookup: {
              from: 'user',
              localField: 'user_id',
              foreignField: '_id',
              as: 'user'
            } },
            { "$unwind": "$user" },
            { $lookup: {
                from: 'media',
                localField: '_id',
                foreignField: 'message_id',
                as: 'photos'
              } },
            { $project: { "content": 1, "feed_time": 1, "id": "$_id", "_id": 0,
                "user": { "display_name": 1, "avatar_url": 1, "id": "$user._id" },
                "photos": { "media_url": 1 }
            } },
            { $sort : { feed_time : -1 } },
            { $limit : 30 }
        ];
        

        //sort(mysort).
        db.collection("message").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;

            client.close();

            if(goBack == 1) {} else result.reverse();

            result.forEach(function(item, index) {
                //item.user = item.user[0];
            });

            res.send(JSON.stringify(result));
          });
    });

});

module.exports = router;
