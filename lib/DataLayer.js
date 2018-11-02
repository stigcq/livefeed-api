
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


exports.getMessage = async function(messageId, callback) {

    MongoClient.connect(connectString, function (err, client) {

        if (err) throw err
      
        var db = client.db(process.env.DB_DB);

        db.collection("message").findOne({ _id: ObjectID(messageId) }, function(err, ires) {

            if (err) throw err;

            client.close();
                
            if(ires != null) {
                console.log("1 message found id " + ires._id );
                callback(ires);
            } else {
                console.log("no message found ");
                callback(false);
            }

        });
    });
}


exports.getMedia = async function(mediaId, callback) {

    MongoClient.connect(connectString, function (err, client) {

        if (err) throw err
      
        var db = client.db(process.env.DB_DB);

        db.collection("media").findOne({ _id: ObjectID(mediaId) }, function(err, ires) {

            if (err) throw err;

            client.close();
                
            if(ires != null) {
                console.log("1 media found id " + ires._id );
                callback(ires);
            } else {
                console.log("no media found ");
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

/**
 * Get all users feeds
 * 
 * @param {ObjectID} userId mongodb objectid of user 
 * @param {requestCallback} callback 
 * 
 */
exports.getUserFeeds = async function(userId, callback) {

    MongoClient.connect(connectString, function (err, client) {
        if (err) throw err
      
        var db = client.db(process.env.DB_DB);

        db.collection("feed").find({ user_id: userId }, 
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


exports.setAvatar = function(userId, media_url, callback) {

    MongoClient.connect(connectString, function (err, client) {
        if (err) throw err
      
        var db = client.db(process.env.DB_DB);

        var myquery = { _id: userId };
        var newvalues = { $set: {avatar_url: media_url } };

        db.collection("user").updateOne(myquery, newvalues, function(err, ires) {
            if (err) throw err;
            console.log("avatar url updated" + JSON.stringify(ires) );
            client.close();
            callback(ires);
        });

    });
};

exports.addMedia = function(media, callback) {

    MongoClient.connect(connectString, function (err, client) {
        if (err) throw err
      
        var db = client.db(process.env.DB_DB);

        db.collection("media").insertOne(media, function(err, ires) {
            if (err) throw err;
            console.log("1 media inserted id " + JSON.stringify(media) );
            client.close();
            callback(media);
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


