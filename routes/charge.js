// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

// ElephantSQL database settings
var pg = require('pg');
var conString = process.env.ELEPHANTSQL_URL;
var client = new pg.Client(conString);

var stripe = require("stripe")("sk_test_e102x7xCt1rjXjLshrps2Huv");
// var fs = require('fs');

router.post("/", function(req, res){

	var token = req.body.stripeToken;
	var amount = req.body.stripeAmount;
	var uid = req.body.uid || "mw10104587";
	var contents = req.body.contents;
	var transaction_id = parseInt(Math.random() * 1000);

	// Check the amount received.
	console.log(`Amount: ${amount}`);
	console.log(`contents: ${contents}`);

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

	  if ( err === null ) {

	  	// send a message back from here and 
	  	res.send({state: "payment succeeded", conString: conString});

	  	// save the record to our database
	  	client.connect(function(err){
			if(err) {
				return console.error('could not connect to postgres', err);
			}

			const t = +new Date();
			const q_front = 'INSERT INTO transaction (uid, transaction_id, contents, timestamp, amount) VALUES';
			const q = `${q_front} ('${uid}', ${transaction_id}, '${contents}', ${t}, ${amount})`;
			console.log(q);

		  	client.query( q, function(err, result) {

			    if(err) return console.error('error running query', err);
				
				console.log(result);
				client.end();
			});
		})


	  }
	 

	});



});

module.exports = router;


/**
A function that renders a form html to our users that requires them to
input credit card information. The form is stored in the template dir.

*/

