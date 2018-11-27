var express = require('express');
var router = express.Router();

var dataLayer = require('./../lib/DataLayer');


/* delete message */
router.post('/', function(req, res, next) {

    if(!req.app.get("user")) {
        const response = {'message': 'Need to be logged in to delete message', 'error': 1};
        res.send(JSON.stringify(response));
        return;
    }

    const mediaId = req.body.media_id;

    dataLayer.deleteMedia(req.app.get("user")._id, mediaId, function(response) {

        res.send(JSON.stringify(response));

    });
    


});

module.exports = router;
