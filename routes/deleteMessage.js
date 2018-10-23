var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat'); 
var MongoClient = require('mongodb').MongoClient


/* delete message */
router.get('/', function(req, res, next) {

    const message_id = req.params.message_id;
    
    
    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@localhost:27017', function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        var query = {"_id": message_id};

        db.collection("message").deleteOne(query, 
            function(err, ires) {
            if (err) throw err;
            console.log("1 message deleted id " + message_id);
            client.close();
            res.send( 'message deleted ');
        });
    });

});

module.exports = router;
