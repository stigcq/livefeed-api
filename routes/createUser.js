var express = require('express');
var router = express.Router();
var dataLayer = require('./../lib/DataLayer');
var md5 = require('md5');

/* create user */
router.post('/', function(req, res, next) {

    const useremail = req.body.email;
    const password = req.body.password;
    const display_name = req.body.display_name;

    //just a basic check. The md5 gives error if value is undefined
    if(useremail == undefined || password == undefined || display_name == undefined) {
        var response = {"error": 9, "message": "some paramenters not set"};
        res.send(JSON.stringify(response));
        return;
    }

    //TODO: insert some checks on values inputted here, length etc

    var item = {
        "email": useremail, 
        "password": md5(password),
        "display_name": display_name,
        "session_token": Math.floor((Math.random() * 10000000))
    };

    dataLayer.addUser(item, function(user) {

        if(user == false) {
            var response = {"error": 8, "message": "Error creating user, maybe Email already in use"};
            res.send(JSON.stringify(response));
        } else {
            res.send(JSON.stringify(user));
        }
    });

});

module.exports = router;
