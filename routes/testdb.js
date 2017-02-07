var pg = require('pg');

var conString = process.env.ELEPHANTSQL_URL;
console.log(conString);

var client = new pg.Client(conString);

client.connect(function(err){
	if(err) {
		return console.error('could not connect to postgres', err);
	}
  	client.query('SELECT * FROM transaction', function(err, result) {
	    if(err) {
	    	return console.error('error running query', err);
	    }
		console.log(result);
		//output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
		client.end();
	});
})