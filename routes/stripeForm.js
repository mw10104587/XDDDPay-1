var express = require('express');
var router = express.Router();

/* GET stripe form. */
router.get('/', function(req, res, next) {
  res.render('stripe-form');
});

module.exports = router;