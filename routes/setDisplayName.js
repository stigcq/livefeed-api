var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');

/*  */
router.post('/', function(req, res, next) {

    if(req.app.get("user") == false) {
        response = {'message': 'Need to be logged in', 'error': 1 } ;
        res.send(JSON.stringify(response));
        return;
    }

    displayName = req.body.display_name;

        dataLayer.setDisplayName(req.app.get("user")._id, displayName, function(result) {
            res.send(JSON.stringify(result));
        });

    
    

    

});

module.exports = router;
