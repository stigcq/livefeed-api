var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');


/*  */
router.get('/:media_id', function(req, res, next) {

    if(req.app.get("user") == false) {
        response = {'message': 'Need to be logged in', 'error': 1 } ;
        res.send(JSON.stringify(response));
        return;
    }

    dataLayer.getMedia(mediaId, function(media) {

        dataLayer.setAvatar(req.app.get("user")._id, media.media_url, function(feed) {
            res.send(JSON.stringify(item));
        });
    
    });

    

});

module.exports = router;
