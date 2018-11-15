var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');


/*  */
router.post('/', function(req, res, next) {

    const feed_title = req.body.feed_title;

    if(req.app.get("user") == false) {
        response = {'message': 'Need to be logged in to create feed', 'error': 1 } ;
        res.send(JSON.stringify(response));
        return;
    }

    var item = {
        "user_id": req.app.get("user")._id,
        "feed_title": feed_title,
        "feed_date": new Date().getTime()
    };

    dataLayer.addFeed(item, function(feed) {
        res.send(JSON.stringify(item));
    })
    

});

module.exports = router;
