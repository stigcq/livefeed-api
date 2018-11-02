var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');


/*  */
router.post('/', function(req, res, next) {

    if(req.app.get("user") == false) {
        response = {'message': 'Need to be logged in', 'error': 1 } ;
        res.send(JSON.stringify(response));
        return;
    }

    media_id = req.body.media_id;

    dataLayer.getMedia(media_id, function(media) {

        dataLayer.setAvatar(req.app.get("user")._id, media.media_url, function(feed) {
            res.send(JSON.stringify(item));
        });
    
    });

    

});

module.exports = router;
