const DEV_MODE = true;

if ( DEV_MODE === true ) {
  // if it is dev mode, we use the fake given card number
  document.querySelector("[data-stripe='number']").value = 601111111111111;
  // localStorage.setItem("stripe-amount", 2300);
}


(function(){

  var card = new Card({
    // a selector or DOM element for the form where users will
    // be entering their information
    form: 'form#payment-form', // *required*
    // a selector or DOM element for the container
    // where you want the card to appear
    container: '.card-wrapper', // *required*

    formSelectors: {
        numberInput: 'input#number', // optional — default input[name="number"]
        expiryInput: 'input#expiry', // optional — default input[name="expiry"]
        cvcInput: 'input#cvc', // optional — default input[name="cvc"]
        nameInput: 'input#name' // optional - defaults input[name="name"]
    },

    width: 250, // optional — default 350px
    formatting: true, // optional - default true

    // Strings for translation - optional
    messages: {
        validDate: 'valid\ndate', // optional - default 'valid\nthru'
        monthYear: 'mm/yyyy', // optional - default 'month/year'
    },

    // Default placeholders for rendered fields - optional
    placeholders: {
        number: '•••• •••• •••• ••••',
        name: 'Full Name',
        expiry: '••/••',
        cvc: '•••'
    },
    // masks: {
    //     cardNumber: '•' // optional - mask card number
    // }

    // if true, will log helpful messages for setting up Card
    debug: true // optional - default false
});

})();



function stripeResponseHandler(status, response) {

  console.log("in callback stripe response handler");

  // Grab the form:
  var $form = $('#payment-form');

  if (response.error) { // Problem!

    console.log('in error...');

    // Show the errors on the form:
    $form.find('.payment-errors').text(response.error.message);
    $form.find('.submit').prop('disabled', false); // Re-enable submission

  } else { // Token was created!

    // Get the token ID:
    var token = response.id;
    // console.log(`token: ${token}`);
    
    var amount = localStorage.getItem("stripe-amount");
    console.log(`Amount: ${amount}`);

    // Insert the token ID into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="stripeToken">').val(token) );

    // Insert the amount to charge into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="stripeAmount">').val(amount) );

    // an array of what the user purchased is sent to the server as well
    const c = localStorage.getItem('purchase-contents');
    
    $form.append($('<input type="hidden" name="contents">').val( localStorage.getItem('purchase-contents') ));

    // Submit the form:
    // The submit from Stripe, but we want to make an ajax call here..
    // $form.get(0).submit(function(event){
    //   console.log('call back after submitting...');
    // });

    $.post("/charge", {stripeToken: token, stripeAmount: amount, contents: c}, function(data){
      // console.log(data);
      if ( data["state"] === "payment succeeded" ) {
            window.location = "/charge/confirmation";    
      }


    });
  }
};


$(function() {
  var $form = $('#payment-form');

  $form.submit(function(event) {

    // seperate the date into two input that meets the format neede by Stripe
    const monthYear = document.getElementById('expiry').value.replace(/[ ]+/g, '');
    const myArray = monthYear.split("/");

    // if no slash is found, it means that the year and month value is not input correctly
    if ( myArray.length < 2 ) return;

    document.querySelector('input[data-stripe="exp_month"]').value = myArray[0];
    document.querySelector('input[data-stripe="exp_year"]').value = myArray[1];

    // check their values...
    // console.log(document.querySelector('input[data-stripe="exp_month"]').value);
    // console.log(document.querySelector('input[data-stripe="exp_year"]').value);

    // Disable the submit button to prevent repeated clicks:
    $form.find('.submit').prop('disabled', true);

    // Request a token from Stripe:
    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from being submitted:
    return false;
  });
});

