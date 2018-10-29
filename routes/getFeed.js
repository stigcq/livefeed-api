var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');

/*  */
router.get('/:feed_id', function(req, res, next) {

    const feed_id = req.params.feed_id;

    if(feed_id.length != 12 && feed_id.length != 24) {
        response = {'error': 1, 'mesage': 'feed id is not valid' };
        res.send(JSON.stringify(response));
        return;
    }

    dataLayer.getFeed(feed_id, function(feed) {

        if(feed == false) {
            const response = {'error': 1, 'mesage': 'feed not found' }; 
            res.send(JSON.stringify(response));
        } else {
            res.send(JSON.stringify(feed));
        }
    });

});

module.exports = router;
