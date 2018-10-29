var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat'); 
var MongoClient = require('mongodb').MongoClient


/*  */
router.post('/', function(req, res, next) {

    const feed_title = req.body.feed_title;

    if(req.app.get("user") == false) {
        response = {'message': 'Need to be logged in to create feed', 'error': 4 } ;
        res.send(JSON.stringify(response));
        return;
    }

    var item = {
        "user_id": req.app.get("user")._id,
        "feed_title": feed_title,
        "feed_date": new Date().getTime()
    };
    
    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        db.collection("feed").insertOne(item, function(err, ires) {
            if (err) throw err;

            console.log("1 feed inserted id " + item._id );
            
            client.close();
            res.send(JSON.stringify(item));
        });
    });

});

module.exports = router;
