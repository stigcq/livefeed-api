var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');
var mongodb = require("mongodb");

/*  */
router.post('/', function(req, res, next) {

    if(req.app.get("user") == false) {
        response = {'message': 'Need to be logged in', 'error': 1 } ;
        res.send(JSON.stringify(response));
        return;
    }

    mediaId = req.body.media_id;
    
    /*if(mongodb.ObjectID.isValid(mediaId) == false) {
        response = {'error': 6, 'mesage': 'id is not a valid id' };
        res.send(JSON.stringify(response));
        return;
    }*/

    dataLayer.getMedia(mediaId, function(media) {

        dataLayer.setAvatar(req.app.get("user")._id, media.media_url, function(result) {
            res.send(JSON.stringify(result));
        });
    
    });

    

});

module.exports = router;
