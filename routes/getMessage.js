var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');
var mongodb = require("mongodb");

/*  */
router.get('/:message_id', function(req, res, next) {

    const message_id = req.params.message_id;

    if(mongodb.ObjectID.isValid(message_id) == false) {
        response = {'error': 6, 'mesage': 'message id is not valid' };
        res.send(JSON.stringify(response));
        return;
    }
    
    console.log("get_message " + message_id);

    dataLayer.getMessage(message_id, function(message) {

        if(message == false) {
            response = {'error': 7, 'mesage': 'message not found' };
            res.send(JSON.stringify(response));
        } else {
            res.send(JSON.stringify(message));
        }
    });


});

module.exports = router;
