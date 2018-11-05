var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var dataLayer = require('./../lib/DataLayer');


/*  */
router.post('/', function(req, res, next) {

    const message_id = req.body.message_id;
    const content = req.body.content;
    //not needed, adopt from message
    //const feed_id = req.body.feed_id;

    if(req.app.get("user") == false) {
        var response = {'message': 'Need to be logged in to add comment', 'error': 1};
        res.send(JSON.stringify(response));
        return;
    }

    dataLayer.getMessage(message_id, function(replyMessage) {

        if(replyMessage == false) {

            var response = {'message': 'no message with messageid exists', 'error': 12};
            res.send(JSON.stringify(response));
            return;
        } else {

            var item = {
                "user_id": req.app.get("user")._id,
                "content": content, 
                "feed_id": replyMessage.feed_id,
                "reply_to": message_id,
                "feed_time": new Date().getTime()
            };
            
        
            dataLayer.addMessage(item, function(message) {
                res.send(JSON.stringify(message));
            });
        }
    });



});

module.exports = router;
