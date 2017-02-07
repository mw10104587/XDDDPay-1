// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var stripe = require("stripe")("sk_test_e102x7xCt1rjXjLshrps2Huv");
// var fs = require('fs');


router.post("/", function(req, res){

	console.log('post request received...');

	var token = req.body.stripeToken;
	var amount = req.body.stripeAmount;

	// Check the amount received.
	console.log(`Amount: ${amount}`);

	var ch = stripe.charges.create({
	  amount: amount,
	  currency: "usd",
	  description: "Example charge",
	  source: token,
	}, function(err, charge) {
	  
	  // call back after charge
	  console.log("Charged in post version!");
	  // console.log(charge);
	  // console.log(err);

	  // send a message back from here and save the record to our database
	  if ( err === null ) {
	  	res.send({state: "payment succeeded"});	
	  }
	 

	});



});

module.exports = router;


/**
A function that renders a form html to our users that requires them to
input credit card information. The form is stored in the template dir.

*/

