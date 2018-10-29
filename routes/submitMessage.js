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

    //feedid 0 post to users default feed
    if(feed_id == 0) {

        dataLayer.getUserFeed(req.app.get("user")._id, function(feed) {

            if(feed == false) {
                const response = {'message': 'No feed for user', 'error': 3};
                res.send(JSON.stringify(response));
                return;
            }

            var message = {
                "feed_id": feed._id, 
                "user_id": req.app.get("user")._id,
                "content": content, 
                "reply_to": 0,
                "feed_time": new Date().getTime(),
                "feed_title": feed.feed_title
            };
    
            dataLayer.addMessage(message, function(message) {
                res.send(JSON.stringify(message));
            });
        });
    } else // normal situation
    dataLayer.getFeed(feed_id, function(feed) {

        if(feed == false) {
            const response = {'message': 'No such feed exists', 'error': 1};
            res.send(JSON.stringify(response));
            return;
        }

        //console.log(feed.user_id + " " + req.app.get("user")._id);
    
        if(feed.user_id != req.app.get("user")._id.toString()) {
            const response = {'message': 'No permissions to this feed', 'error': 2};
            res.send(JSON.stringify(response));
            return;
        }    

        console.log("bingo add message");

        var message = {
            "feed_id": feed._id, 
            "user_id": req.app.get("user")._id,
            "content": content, 
            "reply_to": 0,
            "feed_time": new Date().getTime(),
            "feed_title": feed.feed_title
        };

        dataLayer.addMessage(message, function(message) {
            res.send(JSON.stringify(message));
        });
    
    });

});

module.exports = router;
