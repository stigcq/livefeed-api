var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;


/* delete message */
router.get('/:message_id', function(req, res, next) {

    const message_id = req.params.message_id;
    
    
    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':27017', function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        var query = {"_id": ObjectID(message_id)};

        db.collection("message").deleteOne(query, function(err, ires) {
            if (err) throw err;
            console.log("1 message deleted id " + message_id);
            client.close();
            res.send(JSON.stringify(ires));
        });
    });

});

module.exports = router;
