var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;


/* delete message */
router.post('/', function(req, res, next) {

    if(!req.app.get("user")) {
        const response = {'message': 'Need to be logged in to delete message', 'error': 1};
        res.send(JSON.stringify(response));
        return;
    }

    const message_id = req.body.message_id;
    
    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
        if (err) throw err
      
        var db = client.db(process.env.DB_DB);

        var query = {"_id": ObjectID(message_id), "user_id": req.app.get("user")._id};

        db.collection("message").deleteOne(query, function(err, ires) {
            if (err) throw err;
            console.log("1 message deleted id " + message_id);
            client.close();
            res.send(JSON.stringify(ires));
        });
    });

});

module.exports = router;
