var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');


/*  */
router.get('/:message_id', function(req, res, next) {

    const message_id = req.params.message_id;
    
    console.log("get comments for: " + message_id);

    dataLayer.getComments(message_id, function(result) {
        res.send(JSON.stringify(result));

    });

});

module.exports = router;
