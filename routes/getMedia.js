var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');
var mongodb = require("mongodb");

/*  */
router.get('/:media_id', function(req, res, next) {

    const mediaId = req.params.media_id;
    
    console.log("get_media " + mediaId);

    dataLayer.getMedia(mediaId, function(media) {
        if(media == false) {
            response = {'error': 7, 'mesage': 'media not found' };
            res.send(JSON.stringify(response));
        } else {
            //media["id"] = media._id;
            //media._id = null;
            res.send(JSON.stringify(media));
        }
    });


});

module.exports = router;
