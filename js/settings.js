// Save popup
function savedisp() {
    $(".a").fadeIn();
    $(".a").fadeOut();
}

// Form variables
var feet = document.getElementById('feetinput');
var inches = document.getElementById('inchinput');
var gender = document.getElementById('genderinput');
var age = document.getElementById('ageinput');
var weight = document.getElementById('weightinput');
var hours = document.getElementById('hoursinput');
var alertInt = document.getElementById('alertinput');

//init localstorage
/*localStorage.setItem("Feet", feet.value);
localStorage.setItem("Inch", inches.value);
localStorage.setItem("Gender", gender.value);
localStorage.setItem("Age", age.value);
localStorage.setItem("Weight", weight.value);
localStorage.setItem("Bedtime", bedtime.value);
localStorage.setItem("Alerts", alertInt.value);
*/

// Save to local storage
function saveForm() {
    localStorage.setItem("Feet", feet.value);
    localStorage.setItem("Inch", inches.value);
    localStorage.setItem("Gender", gender.value);
    localStorage.setItem("Age", age.value);
    localStorage.setItem("Weight", weight.value);
    localStorage.setItem("Hours", hours.value);
    localStorage.setItem("Alerts", alertInt.value);
}

// Recall local storage
feet.value = localStorage.getItem("Feet");
inches.value = localStorage.getItem("Inch");
gender.value = localStorage.getItem("Gender");
age.value = localStorage.getItem("Age");
weight.value = localStorage.getItem("Weight");
hours.value = localStorage.getItem("Hours");
alertInt.value = localStorage.getItem("Alerts");
