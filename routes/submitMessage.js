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

    const thread_id = req.body.thread_id;
    const content = req.body.content;

    var item = {
        "thread_id": thread_id, 
        "author_id": req.app.get("user")._id,
        "content": content, 
        "reply_to": 0,
        "feed_time": dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss")
    };
    
    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':27017', function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

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
