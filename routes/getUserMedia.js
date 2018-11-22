var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');


/*  */
router.get('/:user_id/:limit', function(req, res, next) {

    const userId = req.params.user_id;
    const limit = req.params.limit;
    
    dataLayer.getUserMedia(userId, limit, function(medias) {

        if(medias == false) {
            response = [];
            res.send(JSON.stringify(response));
        } else {
            res.send(JSON.stringify(medias));
        }
    });


});

module.exports = router;
