var express = require('express');
var router = express.Router();

var dataLayer = require('./../lib/DataLayer');


/* delete feed */
router.post('/', function(req, res, next) {

    if(!req.app.get("user")) {
        const response = {'message': 'Need to be logged in to delete feed', 'error': 1};
        res.send(JSON.stringify(response));
        return;
    }

    const feedId = req.body.feed_id;
    
    if(feedId == undefined) {
        const response = {'message': 'feed_id is not set', 'error': 1};
        res.send(JSON.stringify(response));
        return;
    }

    dataLayer.deleteFeed(req.app.get("user")._id, feedId, function(response) {

        res.send(JSON.stringify(response));

    });
    


});

module.exports = router;
