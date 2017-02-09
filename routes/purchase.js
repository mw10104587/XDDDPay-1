var express = require('express');
var router = express.Router();

/* GET purchase page. */
router.get('/', function(req, res, next) {
  // res.render('purchase');
  // because here we're using a html file instead of a jade file that needs to be 
  // transformed, we use sendfile instead of render
  console.log('IN GET...');
  console.log(req.query);
  console.log(req.query.test);
  res.sendfile('public/template/catalog.html');
});

module.exports = router;
