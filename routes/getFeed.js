var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

/*  */
router.get('/:feed_id', function(req, res, next) {

    const feed_id = req.params.feed_id;

    if(feed_id.length != 12 || feed_id.length != 24) {

        res.send("{'error': 1, 'mesage': 'feed id is not valid' }");
        return;
    }
    
    console.log("get_message " + message_id);

    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        db.collection("feed").findOne({ _id: ObjectID(feed_id) }, 
            function(err, ires) {
            if (err) throw err;

            if(ires != null) {
                console.log("1 feed found id " + ires._id );
                client.close();
                res.send(JSON.stringify(ires));
            } else {
                console.log("no feed found ");
                client.close();
                res.send("{'error': 1, 'mesage': 'feed not found' }");
            }

        });
    });

});

module.exports = router;
