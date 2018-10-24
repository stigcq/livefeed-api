var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //testing
  req.app.set("user", "check user logged in catch all route");

  next();
});

module.exports = router;
