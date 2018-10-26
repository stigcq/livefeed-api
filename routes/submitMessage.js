var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat'); 
var MongoClient = require('mongodb').MongoClient


/*  */
router.post('/', function(req, res, next) {

    console.log("user object" + req.app.get("user"));

    if(req.app.get("user") == false) {
        res.send("{'message': 'Need to be logged in to add message', 'error': 1}");
        return;
    }

    const feed_id = req.body.feed_id;
    const content = req.body.content;
    
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
