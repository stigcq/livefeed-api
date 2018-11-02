var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');


/*  */
router.post('/', function(req, res, next) {

    const media_url = req.body.media_url;

    if(req.app.get("user") == false) {
        response = {'message': 'Need to be logged in', 'error': 10 } ;
        res.send(JSON.stringify(response));
        return;
    }

    var item = {
        "user_id": req.app.get("user")._id,
        "media_url": media_url,
        "media_date": new Date().getTime()
    };

    dataLayer.addMedia(item, function(feed) {
        res.send(JSON.stringify(item));
    })
    

});

module.exports = router;
