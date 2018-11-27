var express = require('express');
var router = express.Router();


/*  */
router.post('/', function(req, res, next) {

    const sessionToken = req.body.session_token;

    if(req.app.get("user") == false) {
        response = {'message': 'session is not valid', 'ok': 0 } ;
        res.send(JSON.stringify(response));

    }

    if(req.app.get("user").session_token == sessionToken) {
        response = {'message': 'session is valid', 'ok': 1 } ;
        res.send(JSON.stringify(response));
    } else {
        response = {'message': 'session is not valid', 'ok': 0 } ;
        res.send(JSON.stringify(response));

    }
    

});

module.exports = router;
