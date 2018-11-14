var express = require('express');
var router = express.Router();
var authLayer = require('./../lib/AuthLayer');

/*      
check email/pass match
create a token
update user row with token
send token to client in json
 */
router.post('/', function(req, res, next) {

  const myemail = req.body.email;
  const md5password = req.body.md5password;

  authLayer.login(myemail, md5password, function(result) {

    if(result == false) {

      const response = { 'message': "No such user", 'session_token': 1 };
      res.send(JSON.stringify(response));

    } else {
        res.send(JSON.stringify(result));

    }
  });

});

module.exports = router;
