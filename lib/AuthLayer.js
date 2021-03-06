var exports = module.exports = {};
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

var connectString = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT;

function santatizeId(object) {

    object["id"] = object._id;
    object._id = undefined;
    return object;
}




exports.login = async function(myemail, md5pass, callback) {

    MongoClient.connect(connectString, function (err, client) {

        if (err) throw err
      
        var db = client.db(process.env.DB_DB);

        db.collection("user").findOne({email: myemail, password: md5pass }, function(err, ires) {
            if (err) throw err;
      
            if(ires != null) {
              console.log("1 user found id " + ires._id );
              console.log(JSON.stringify(ires));
                
              my_session_token = Math.floor((Math.random() * 10000000));
      
              // FIXME: this query is wrong but I cant get the one using id to work, total BS
              var myquery = { email: myemail, password: md5pass }; //{ '_id': ObjectID(ires.id) };
              var newvalues = { $set: {'session_token': Number(my_session_token) } };
      
              db.collection("user").updateOne(myquery, newvalues, function(err, iires) {
                  if (err) throw err;
                  console.log("1 user updated " + my_session_token);
      
                  var myresult = { 
                    session_token: my_session_token, 
                    id: ires._id,
                    avatar_url: ires.avatar_url,
                    display_name: ires.display_name };
              
                  callback(myresult);
              
                  client.close();
                });
      
            } else {
                console.log("no user found ");
                client.close();
                callback(false);
            }
      
          });
    });
}

/**
 * Returns the user object for the session, or false if none.
 * 
 */
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

};