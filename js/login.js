// Animation for clicking "Sign In" vs. "Create an account"
$('.message a').click(function () {
    $('form').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow");
});

/**
 * Storing input from register-form to localStorage
 * 
 * @param {Object} username - Username the user has chosen
 * @param {Object} password - Password the user has chosen
 */
function store(username, password) {
    localStorage.setItem("username", username.value);
    localStorage.setItem("password", password.value);
}

/** 
 * Check if localStorage data from register-form is equal to data entered from
 * login-form.
 * 
 * @return {boolean} True if username and/or password don't match what's in
 * localStorage, false otherwise. False will also allow a re-direct to the
 * homepage. 
 */
function check() {
    // Stored data from register-form
    var storedUsername = localStorage.getItem("username");
    var storedPassword = localStorage.getItem("password");

    // Entered data from login-form
    var inputUsername = document.getElementById("login-username");
    var inputPassword = document.getElementById("login-password");

    if (inputUsername.value == storedUsername &&
        inputPassword.value == storedPassword) {
        window.location = "index.html";

        return false;
    } else {
        alert("Username or password is incorrect. Please try again.");

        return true;
    }
}

/**
 * Error checks to see if re-typing your password during registration was
 * valid. If it is, then it'll store the username and password in localStorage.
 * Otherwise, it'll prompt the user to re-type their password.
 * 
 * @param {Object} registerUsername - Username chosen during account 
 * registration.
 * @param {Object} registerPassword - Password from when you first registered
 * your account.
 * @param {Object} confirmPassword - Re-typed 'registerPassword' to confirm
 * your password.
 * @return {boolean} True if passwords don't match, false otherwise. False
 * will also allow a re-direct to the homepage.
 */
function validatePassword(registerUsername, registerPassword, confirmPassword) {
    if (registerPassword.value != confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords do not match.");

        return true;
    } else {
        store(registerUsername, confirmPassword);
        alert("Account successfully created!");
        window.location = "index.html";

        return false;
    }
}

/**
 * Error checks for missing username and/or passwords, and mismatching 
 * confirmation password.
 * 
 * @return {boolean} If 'validatePassword()' returns false, then it signifies
 * that input information was correct and will re-direct the user to the 
 * homepage. Otherwise, it'll throw errors.
 */
function validateRegistration() {
    var registerUsername = document.getElementById("register-username");
    var registerPassword = document.getElementById("register-password");
    var confirmPassword = document.getElementById("confirm-password");

    if (registerUsername.value.length == 0) {
        alert("Username must contain at least 1 character. Please try again.");
    } else {
        if (registerPassword.value.length == 0 ||
            confirmPassword.value.length == 0) {
            alert("Password must contain at least 1 character. Please try again.");
        } else {
            return validatePassword(
                registerUsername, registerPassword, confirmPassword);
        }
    }
}