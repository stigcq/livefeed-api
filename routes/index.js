var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //testing
  res.send(req.app.get("user"));

});

module.exports = router;
