var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

/*      
check email/pass match
create a token
update user row with token
send token to client in json
 */
router.post('/', function(req, res, next) {

  const myemail = req.body.email;
  const md5password = req.body.md5password;

  MongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + 
  '@' + process.env.DB_HOST + ':27017', function (err, client) {
  if (err) throw err

  var db = client.db('livefeed-api');

  db.collection("user").findOne({email: myemail, password: md5password }, 
      function(err, ires) {
      if (err) throw err;

      if(ires != null) {
        console.log("1 user found id " + ires._id );
        console.log(JSON.stringify(ires));
          
        my_session_token = Math.floor((Math.random() * 10000000));

        // FIXME: this query is wrong but I cant get the one using id to work, total BS
        var myquery = { password: md5password }; //{ '_id': ObjectID(ires.id) };
        var newvalues = { $set: {'session_token': Number(my_session_token) } };

        db.collection("user").updateOne(myquery, newvalues, function(err, iires) {
            if (err) throw err;
            console.log("1 document updated" + iires);

            var myresult = { session_token: my_session_token, _id: ires._id };
        
            res.send(JSON.stringify(myresult));

            client.close();
          });

      } else {
          console.log("no user found ");
          client.close();
          res.send("{'message': 'No user found', 'session_token': 1}");
      }

    });
  });

});

module.exports = router;
