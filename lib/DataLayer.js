
var exports = module.exports = {};
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var mongodb = require("mongodb");


var connectString = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT;

var PUBLIC_READ = 1;
var PUBLIC_COMMENT = 2;
var PUBLIC_WRITE = 3;
var PRIVATE = 4;


function runDbQuery(doMyquery) {

    MongoClient.connect(connectString, function (err, client) {

        if (err) throw err
      
        var db = client.db(process.env.DB_DB);

        doMyquery(client, db);
            
    });

}

function santatizeId(object) {

    object["id"] = object._id;
    object._id = undefined;
    return object;
}

exports.getFeed = async function(feedId, callback) {

    if(mongodb.ObjectID.isValid(feedId) == false) {
        callback( {'error': 6, 'mesage': 'id is not a valid id' } );
        return;
    }
    runDbQuery(function(client, db) {

        db.collection("feed").findOne({ _id: ObjectID(feedId) }, 
            function(err, ires) {
            if (err) throw err;

            client.close();
                
            if(ires != null) {
                console.log("1 feed found id " + ires._id );
                callback(santatizeId(ires));
            } else {
                console.log("no feed found ");
                callback(false);
            }

        });
    });
}


exports.getMessage = async function(messageId, callback) {

    if(mongodb.ObjectID.isValid(messageId) == false) {
        callback( {'error': 6, 'mesage': 'id is not a valid id' } );
        return;
    }

    runDbQuery(function(client, db) {

        db.collection("message").findOne({ _id: ObjectID(messageId) }, function(err, ires) {

            if (err) throw err;

            client.close();
                
            if(ires != null) {
                console.log("1 message found id " + ires._id );
                callback(santatizeId(ires));
            } else {
                console.log("no message found ");
                callback(false);
            }

        });
    });
}


exports.getMedia = async function(mediaId, callback) {

    if(mongodb.ObjectID.isValid(mediaId) == false) {
        callback({'error': 6, 'mesage': 'id is not a valid id' });
        return;
    }
        
    runDbQuery(function(client, db) {

        db.collection("media").findOne({ _id: ObjectID(mediaId) }, function(err, ires) {

            if (err) throw err;

            client.close();
                
            if(ires != null) {
                console.log("1 media found id " + ires._id );
                ires = santatizeId(ires);
                callback(ires);
            } else {
                console.log("no media found ");
                callback(false);
            }

        });
    });
}


exports.getUserFeed = async function(userId, callback) {

    runDbQuery(function(client, db) {

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
 * Get all the users media
 * 
 * @param {ObjectID} userId mongodb objectid of user 
 * @param {requestCallback} callback 
 * 
 */
exports.getUserMedia = async function(userId, limit, callback) {

    if(mongodb.ObjectID.isValid(userId) == false) {
        callback( {'error': 6, 'mesage': 'id is not a valid id' } );
        return;
    }
        
    runDbQuery(function(client, db) {

        db.collection("media").find({ user_id: ObjectID(userId) }).limit(limit).sort({"media_date": -1}).toArray( 
            function(err, ires) {
            if (err) throw err;

            client.close();

            ires.forEach(function(item, index) {
                item.id = item._id;
                item._id = undefined;
            });
                
            if(ires != null) {
                callback(ires);
            } else {
                callback(false);
            }

        });
    });
};

/**
 * Get all users feeds
 * 
 * @param {ObjectID} userId mongodb objectid of user 
 * @param {requestCallback} callback 
 * 
 */
exports.getUserFeeds = async function(userId, callback) {

    runDbQuery(function(client, db) {

        db.collection("feed").find({ user_id: userId }).toArray( 
            function(err, ires) {
            if (err) throw err;

            client.close();

            ires.forEach(function(item, index) {
                item.id = item._id;
                item._id = undefined;
            });
                
            if(ires != null) {
                console.log(ires.length +  " feed found id ");
                callback(ires);
            } else {
                console.log("no feed found ");
                callback(false);
            }

        });
    });
}



exports.addMessage = function(message, callback) {

    runDbQuery(function(client, db) {

        db.collection("message").insertOne(message, function(err, ires) {
            if (err) throw err;
            console.log("1 message inserted id " + JSON.stringify(message) );
            client.close();
            callback(santatizeId(message));
        });

    });
};

exports.updateMessage = function(messageId, content, callback) {

    if(mongodb.ObjectID.isValid(messageId) == false) {
        callback( {'error': 6, 'mesage': 'id is not a valid id' } );
        return;
    }

    runDbQuery(function(client, db) {

        var myquery = { _id: ObjectID(messageId) };
        var newvalues = { $set: {content: content } };

        db.collection("message").updateOne(myquery, newvalues, function(err, ires) {
            if (err) throw err;
            console.log("message updated" + JSON.stringify(ires) );
            client.close();
            callback(ires);
        });

    });
};


exports.setAvatar = function(userId, media_url, callback) {

    runDbQuery(function(client, db) {

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

exports.setDisplayName = function(userId, displayName, callback) {

    runDbQuery(function(client, db) {

        var myquery = { _id: userId };
        var newvalues = { $set: {display_name: displayName } };

        db.collection("user").updateOne(myquery, newvalues, function(err, ires) {
            if (err) throw err;
            client.close();
            callback(ires);
        });

    });
};

exports.addMedia = function(media, callback) {

    runDbQuery(function(client, db) {

        db.collection("media").insertOne(media, function(err, ires) {
            if (err) throw err;
            console.log("1 media inserted id " + JSON.stringify(media) );
            client.close();
            callback(santatizeId(media));
        });

    });
};

/**
 * The API is message centric, a media doesnt exist by itself,
 * it belongs (should) to a message, so, if a media aint attacked
 * to a message its messageid property is 0, probably just added,
 * and this function then basicly just attach the media to a message
 * 
 * Well, this actually isnt correct, f.x user avatar aint message oriented.
 * But I dont feel this needs be done more advanced for now. More advanced
 * would be the client specifcly adds a mediea to a message posted, but
 * ya dont seee the need yet. 
 * 
 */
exports.attachMedia = function(userId, messageId, callback) {

    runDbQuery(function(client, db) {

        var myquery = { user_id: userId, message_id: 0 }; 
        var newvalues = { $set: {'message_id': messageId } };
      
        db.collection("media").updateMany(myquery, newvalues, function(err, iires) {
            if (err) throw err;
            console.log("1 media updated " + iires);

            callback(iires);

            client.close();
          });

    });
};



exports.addFeed = function(feed, callback) {

    runDbQuery(function(client, db) {

        db.collection("feed").insertOne(feed, function(err, ires) {

            if (err) throw err;
            console.log("1 feed inserted id " + JSON.stringify(feed) );
            client.close();
            callback(santatizeId(feed));
        });

    });
};

exports.addUser = function(user, callback) {

    runDbQuery(function(client, db) {

        db.collection("user").findOne({email: user.email }, function(err, ires) {

            if (err) throw err;
            
            if(ires != null) {
                console.log("createUser: 1 user found id " + ires._id );
     
                client.close();
                callback(false);
          
            } else {

                db.collection("user").insertOne(user, function(err, ires) {
                    if (err) throw err;
                    client.close();

                    callback(santatizeId(user));
                });
            }

        });

    });
};






exports.deleteMessage = function(userId, messageId, callback) {

    if(mongodb.ObjectID.isValid(messageId) == false) {
        callback( {'error': 6, 'mesage': 'id is not a valid id' } );
        return;
    }

    runDbQuery(function(client, db) {
        var query = {"_id": ObjectID(messageId), "user_id": userId};

        db.collection("message").deleteOne(query, function(err, ires) {
           
            if (err) throw err;
            console.log("1 message deleted id " + messageId);
            
            callback(ires);
        });

    });

};


exports.deleteFeed = function(userId, feedId, callback) {

    if(mongodb.ObjectID.isValid(feedId) == false) {
        callback( {'error': 6, 'mesage': 'id is not a valid id' } );
        return;
    }

    runDbQuery(function(client, db) {

        var query = {"_id": ObjectID(feedId), "user_id": userId};

        db.collection("feed").deleteOne(query, function(err, ires) {
           
            if (err) throw err;
            console.log("1 feed deleted id " + feedId);
            client.close();
            
            callback(ires);
        });

    });

};

/**
 * Deletes a user object. The function doesnt handle deleting
 * users feeds mesages or other objects.
 * 
 * @param {ObjectID} userId mongodb objectid of user
 * @param {String} md5pass users pass md5 encrypted
 *
 */
exports.deleteUser = function(userId, md5pass, callback) {

    runDbQuery(function(client, db) {

        var query = {"_id": userId, "password": md5pass};

        db.collection("user").deleteOne(query, function(err, ires) {
           
            if (err) throw err;
            console.log("1 user deleted id " + userId);
            client.close();
            
            callback(ires);
        });

    });

};


exports.getComments = function(messageId, callback) {

    runDbQuery(function(client, db) {

        var mysort = { feed_time: -1 };
        var aggregate = [
            { $match:
                {'reply_to': messageId } },
            { $lookup: {
              from: 'user',
              localField: 'user_id',
              foreignField: '_id',
              as: 'user'
            } },
            { "$unwind": "$user" },
            { $project: { "content": 1, "feed_time": 1,
                "user": { "display_name": 1, 'avatar_url': 1, '_id': 1 }
            } }
        ];
        
        db.collection("message").aggregate(aggregate).sort(mysort).toArray(function(err, result) {

            if (err) throw err;
            client.close();

            callback(result);
        });

    });

};


