var express = require('express');
var router = express.Router();

var dataLayer = require('./../lib/DataLayer');


/* delete feed */
router.post('/', function(req, res, next) {

    if(!req.app.get("user")) {
        const response = {'message': 'Need to be logged in to delete user', 'error': 1};
        res.send(JSON.stringify(response));
        return;
    }

    const md5Pass = req.body.md5_password;
    
    if(md5Pass == undefined) {
        const response = {'message': 'md5_password is not set', 'error': 1};
        res.send(JSON.stringify(response));
        return;
    }

    dataLayer.deleteUser(req.app.get("user")._id, md5Pass, function(response) {
        res.send(JSON.stringify(response));
    });
    


});

module.exports = router;
