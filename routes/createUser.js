var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var md5 = require('md5');

/* create user */
router.post('/', function(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;
    const display_name = req.body.display_name;

    var item = {
        "email": email, 
        "password": md5(password),
        "display_name": display_name,
        "session_token": Math.floor((Math.random() * 10000000))
    };
    
    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@localhost:27017', function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        db.collection("user").insertOne(item, function(err, ires) {
            if (err) throw err;

            console.log("1 user inserted id " + item._id );
            client.close();
            res.send( 'user added ' + item._id);
        });
    });

});

module.exports = router;
