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

    mediaId = req.body.media_id;

    dataLayer.getMedia(mediaId, function(media) {

        if(media != false)
            dataLayer.setAvatar(req.app.get("user")._id, media.media_url, function(result) {
                res.send(JSON.stringify(result));
            });
        else {
            response = {'message': 'No media with ID exists', 'error': 14 } ;
            res.send(JSON.stringify(response));   

        }
    
    });

    

});

module.exports = router;
