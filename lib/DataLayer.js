
var exports = module.exports = {};
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

var connectString = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT;

exports.test = function() {
    console.log("datalayer test");
}

exports.getFeed = async function(feedId, callback) {

    MongoClient.connect(connectString, function (err, client) {

        if (err) throw err
      
        var db = client.db(process.env.DB_DB);

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


exports.getUserFeed = async function(userId, callback) {

    MongoClient.connect(connectString, function (err, client) {
        if (err) throw err
      
        var db = client.db(process.env.DB_DB);

        db.collection("feed").findOne({ user_id: userId }, 
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
      
        var db = client.db(process.env.DB_DB);

        db.collection("message").insertOne(message, function(err, ires) {
            if (err) throw err;
            console.log("1 message inserted id " + JSON.stringify(message) );
            client.close();
            callback(message);
        });

    });
};



exports.addFeed = function(feed, callback) {

    MongoClient.connect(connectString, function (err, client) {

        if (err) throw err
      
        var db = client.db(process.env.DB_DB);

        db.collection("feed").insertOne(message, function(err, ires) {

            if (err) throw err;
            console.log("1 feed inserted id " + JSON.stringify(message) );
            client.close();
            callback(feed);
        });

    });
};

exports.addUser = function(feed, callback) {

    MongoClient.connect(connectString, function (err, client) {

        if (err) throw err
      
        var db = client.db(process.env.DB_DB);

        db.collection("user").findOne({email: useremail }, function(err, ires) {

            if (err) throw err;
      
            if(ires != null) {
                console.log("createUser: 1 user found id " + ires._id );
     
                //var response = {"error": 1, "message": "Email already in use"};
                //res.send(JSON.stringify(response));
                callback(false);
          
            } else {

                db.collection("user").insertOne(item, function(err, ires) {
                    if (err) throw err;
                    client.close();
                    callback(item);
                });
            }

        });

    });
};


exports.findUserSession = function(sessionToken, callback) {

    MongoClient.connect(connectString, function (err, client) {
        if (err) throw err
      
        var db = client.db(process.env.DB_DB);

        db.collection("user").findOne({ 'session_token': Number(sessionToken) }, function(err, ires) {

            if (err) throw err;
      
            if(ires != null) {
                callback(ires);      
            } else {
                callback(false);
            }
          });

    });


}


