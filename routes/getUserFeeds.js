var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;

/*  */
router.get('/:user_id', function(req, res, next) {

    const user_id = req.params.user_id;

    if(mongodb.ObjectID.isValid(user_id) == false) {
        response = {'error': 6, 'mesage': 'user_id is not valid' };
        res.send(JSON.stringify(response));
        return;
    }
    
    dataLayer.getUserFeeds(ObjectID(user_id), function(feeds) {

        if(feeds == false) {
            //response = {'error': 7, 'mesage': 'no feeds found' };
            response = [];
            res.send(JSON.stringify(response));
        } else {
            res.send(JSON.stringify(feeds));
        }
    });


});

module.exports = router;
