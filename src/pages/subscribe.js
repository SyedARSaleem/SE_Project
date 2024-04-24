// JavaScript code to handle the subscription pop-up
document.addEventListener('DOMContentLoaded', function() {

    // Get elements from the DOM
    var subscribeButton = document.getElementById('subscribeButton');
    var popupForm = document.getElementById('popupForm');
    var overlay = document.getElementById('overlay');
    var subscriptionForm = document.getElementById('subscriptionForm');
  
    // Add event listener to subscribe button
    subscribeButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        popupForm.style.display = 'block'; // Display the pop-up form
        overlay.style.display = 'block'; // Display the overlay
    });
  
    // Add event listener to subscription form submission
    subscriptionForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        var email = document.getElementById('email').value; // Get email value
        // Handle the email and password securely here
        alert('Congratulations! You have subscribed to our daily facts.'); // Display confirmation message
        popupForm.style.display = 'none'; // Hide the pop-up form
        overlay.style.display = 'none'; // Hide the overlay
    });

    // Get the close button and add an event listener to it
    var closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', function() {
        popupForm.style.display = 'none'; // Hide the pop-up form
        overlay.style.display = 'none'; // Hide the overlay
    });

    // Add event listener to overlay for closing the pop-up
    overlay.addEventListener('click', function() {
        popupForm.style.display = 'none'; // Hide the pop-up form
        overlay.style.display = 'none'; // Hide the overlay
    });
});

  