var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat'); 
var MongoClient = require('mongodb').MongoClient


/*  */
router.post('/', function(req, res, next) {

    const message_id = req.body.message_id;
    const content = req.body.content;

    if(req.app.get("user") == false) {
        res.send("{'message': 'Need to be logged in to add comment', 'error': 1}");
        return;
    }
    //consider getting message first

    var item = {
        "author_id": req.app.get("user")._id,
        "content": content, 
        "reply_to": message_id,
        "feed_time": dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss")
    };
    
    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':27017', function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        db.collection("message").insertOne(item, function(err, ires) {
            if (err) throw err;

            console.log("1 comment inserted id " + item._id );
            
            client.close();
            res.send(JSON.stringify(item));
        });
    });

});

module.exports = router;
