var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');


/*  */
router.post('/', function(req, res, next) {

    const media_url = req.body.media_url;
    var messageId = req.body.message_id;

    if(messageId == undefined || messageId == null)
        messageId = 0;

    if(req.app.get("user") == false) {
        response = {'message': 'Need to be logged in', 'error': 1 } ;
        res.send(JSON.stringify(response));
        return;
    }

    var item = {
        "user_id": req.app.get("user")._id,
        "media_url": media_url,
        "media_date": new Date().getTime(),
        "message_id": messageId
    };

    /*dataLayer.getMessage(messageId, function(message) {

        if(message.user_id != req.app.get("user")._id) {
            response = {'message': 'You dont have perms for the supplied message_id', 'error': 14 } ;
            res.send(JSON.stringify(response));
            return;
        }*/

        dataLayer.addMedia(item, function(feed) {
            res.send(JSON.stringify(item));
        });
    //});
    

});

module.exports = router;
