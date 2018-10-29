
var exports = module.exports = {};
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

var connectString = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT;

exports.test = function() {
    console.log("datalayer test");
}

exports.getFeed = async function(feedId, callback) {

    MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
        '@' + process.env.DB_HOST + ':' + process.env.DB_PORT, function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        db.collection("feed").findOne({ _id: ObjectID(feedId) }, 
            function(err, ires) {
            if (err) throw err;

            client.close();
                
            if(ires != null) {
                console.log("1 feed found id " + ires._id );
                callback(ires);
            } else {
                console.log("no feed found ");
                callback(false);
            }

        });
    });
}


exports.addMessage = function(message, callback) {

    MongoClient.connect(connectString, function (err, client) {
        if (err) throw err
      
        var db = client.db('livefeed-api');

        db.collection("message").insertOne(message, function(err, ires) {
            if (err) throw err;
            console.log("1 message inserted id " + JSON.stringify(item) );
            client.close();
            //res.send(JSON.stringify(item));
            callback(message);
        });

    });
}


