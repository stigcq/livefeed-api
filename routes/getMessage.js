var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient


/*  */
router.get('/', function(req, res, next) {

    const message_id = req.params.message_id;
    
    console.log("get_message " + message_id);

    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@localhost:27017', function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        db.collection("message").findOne({ _id: ObjectId(message_id) }, 
            function(err, ires) {
            if (err) throw err;
            console.log("1 message found id " + ires._id );
            client.close();
            res.send(JSON.stringify(ires));
        });
    });

});

module.exports = router;
