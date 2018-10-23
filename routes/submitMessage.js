var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient


/*  */
router.post('/', function(req, res, next) {

    const thread_id = req.body.thread_id;
    const content = req.body.content;

    var item = {
        "thread_id": thread_id, 
        "author_id": 1,
        "content": content, "": 1,
        "reply_to": 0,
        "feed_time": 0
    };
    
    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@localhost:27017', function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        db.collection("message").insertOne(item, 
            function(err, ires) {
            if (err) throw err;
            console.log("1 message inserted id " + item._id );
            client.close();
            res.send( 'message added ' + item._id);
        });
    });

});

module.exports = router;
