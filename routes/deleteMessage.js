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

    const messageId = req.body.message_id;

    dataLayer.deleteMessage(req.app.get("user")._id, messageId, function(response) {

        res.send(JSON.stringify(response));

    });
    


});

module.exports = router;
