var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

/*  */
router.get('/:message_id', function(req, res, next) {

    const message_id = req.params.message_id;

    if(message_id.length != 12 && message_id.length != 24) {

        res.send("{'error': 1, 'mesage': 'message id is not valid' }");
        return;
    }
    
    console.log("get_message " + message_id);

    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        db.collection("message").findOne({ _id: ObjectID(message_id) }, 
            function(err, ires) {
            if (err) throw err;

            if(ires != null) {
                console.log("1 message found id " + ires._id );
                client.close();
                res.send(JSON.stringify(ires));
            } else {
                console.log("no message found ");
                client.close();
                res.send("{'error': 1, 'mesage': 'message not found' }");
            }

        });
    });

});

module.exports = router;
