document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('signupForm');
    var modal = document.getElementById('successModal');
    var closeButton = document.querySelector("#successModal .close");
    
    form.onsubmit = function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        var username = form.username.value;
        var password = form.password.value;

        // Check if the form inputs meet the requirements
        if (username.match(/[A-Za-z0-9_]+/) && password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/)) {
            // Show the modal
            modal.style.display = "block";
        }
    };

    // When the user clicks on the close button, close the modal and redirect to login page
    closeButton.onclick = function() {
        modal.style.display = "none";
        window.location.href = 'login.html'; // Redirect to login page
    };

    // When the user clicks anywhere outside of the modal, close it and redirect to login page
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.location.href = 'login.html'; // Redirect to login page
        }
    };
});

