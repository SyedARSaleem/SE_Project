document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('loginForm');
    var modal = document.getElementById('successModal');
    var closeButton = document.querySelector("#successModal .close");
    var successMessageSpan = document.getElementById('successMessage');
    
    form.onsubmit = function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        var username = form.username.value;
        var password = form.password.value;

        // Send a request to the server to authenticate the user
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Parse the response from the server
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        // Update the content of the success message with the username
                        successMessageSpan.textContent = username;
                        // Show the modal
                        modal.style.display = "block";
                    } else {
                        // Handle different error cases based on the response from the server
                        if (response.error === 'invalid_username') {
                            alert('Username is incorrect');
                        } else if (response.error === 'invalid_password') {
                            alert('Password is incorrect');
                        } else {
                            alert('An error occurred');
                        }
                    }
                } else {
                    alert('An error occurred');
                }
            }
        };
        // Send the username and password to the server for authentication
        xhr.send(JSON.stringify({ username: username, password: password }));
    };

    // When the user clicks on the close button, the code closes the modal
    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, the code closes it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});