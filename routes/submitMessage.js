var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var dataLayer = require('./../lib/DataLayer');


/*  */
router.post('/', function(req, res, next) {

    if(req.app.get("user") == false) {
        const response = {'message': 'Need to be logged in to add message', 'error': 1};
        res.send(JSON.stringify(response));
        return;
    }

    const feed_id = req.body.feed_id;
    const content = req.body.content;

    var feed = dataLayer.getFeed(feed_id);

    if(!feed) {
        const response = {'message': 'No such feed exists', 'error': 1};
        res.send(JSON.stringify(response));
        return;
    }

    
    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        /* TODO: check if user have perms for the feed */

        var item = {
            "feed_id": feed_id, 
            "user_id": req.app.get("user")._id,
            "content": content, 
            "reply_to": 0,
            "feed_time": new Date().getTime()
        };

        db.collection("message").insertOne(item, 
            function(err, ires) {
            if (err) throw err;
            console.log("1 message inserted id " + JSON.stringify(item) );
            client.close();
            res.send(JSON.stringify(item));
        });
    });

});

module.exports = router;
