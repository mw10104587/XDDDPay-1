var express = require('express');
var router = express.Router();

/* GET purchase page. */
router.get('/', function(req, res, next) {

  // res.render('purchase');
  // because here we're using a html file instead of a jade file that needs to be 
  // transformed, we use sendfile instead of render
  
  // we can get the user name from the url... but doesn't really make a difference here LOL
  console.log(req.query.username);
  const username = req.query.username;

  res.sendfile('public/template/catalog.html');

});

module.exports = router;
