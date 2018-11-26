var dropDown, tRemain, percRemain, interval;

$(document).ready(function () {
    if (localStorage.getItem("Hours") === null) {
        localStorage.setItem("Hours", 8);
    }

    dropDown = document.getElementById("UserInput");
});

// "Data recorded" popup
function savePopup() {
    $(".datapopup").fadeIn();
    $(".datapopup").fadeOut();
}

// Check to see if bar is already running
$(document).ready(function () {
    $('#setButton').click(function () {
        localStorage.setItem("running", 1);
        localStorage.setItem("wakeString", dropDown.options[dropDown.selectedIndex].text);
        //document.write(localStorage.getItem("wakeString"));
    });
});

$(document).ready(function () {
    if (localStorage.getItem("running") == 1) {
        dropDown.options[dropDown.selectedIndex].text = localStorage.getItem("wakeString");
        tRemain = setInterval(updateTime, 300);
        percRemain = setInterval(updatePercent, 300);
        interval = setInterval(initBar, 300);
    }
});

// Record data
function sleepytime() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    //var dropDown = document.getElementById("UserInput");
    localStorage.setItem("wakeString", dropDown.options[dropDown.selectedIndex].text);
    var wakeUpString = localStorage.getItem("wakeString"); //dropDown.options[dropDown.selectedIndex].text;
    var wakeHour = Number(wakeUpString.charAt(0) + wakeUpString.charAt(1));
    var wakeMin = Number(wakeUpString.charAt(3) + wakeUpString.charAt(4));
    var pmCheck = wakeUpString.charAt(6);
    var sleptHours = 0;

    // Edge case for setting wake-up time to 12:00 AM & 12:30 AM
    if (pmCheck != "P" && wakeHour == 12) {
        wakeHour = 0;
    }

    // Sets conditional for all times except for 12:00 PM & 12:30 PM
    if (pmCheck == "P" && wakeHour != 12) {
        wakeHour += 12;
    }

    if (hour > wakeHour) {
        sleptHours = 24 - hour + wakeHour;

    } else if (hour < wakeHour) {
        sleptHours = wakeHour - hour;

    }

    var sleptMin = Math.abs((60 - min) - wakeMin);
    if (min > wakeMin) {
        var carryover = 1;
    } else {
        var carryover = 0;
    }

    var totalSleep = Math.round((((sleptHours - carryover) * 60 + sleptMin) / 60) * 10) / 10;

    localStorage.setItem('hours', totalSleep);
    localStorage.setItem('day', date.getDay());
}

// Time remaining related functions
$(document).ready(function () {
    $('#setButton').click(function () {
        clearInterval(tRemain);
        tRemain = setInterval(updateTime, 300);
    });
});

function updateTime() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes() + 1;
    var sec = date.getSeconds();
    //var dropDown = document.getElementById("UserInput");
    localStorage.setItem("wakeString", dropDown.options[dropDown.selectedIndex].text);
    var wakeUpString = localStorage.getItem("wakeString"); //dropDown.options[dropDown.selectedIndex].text;
    var wakeHour = Number(wakeUpString.charAt(0) + wakeUpString.charAt(1));
    var wakeMin = Number(wakeUpString.charAt(3) + wakeUpString.charAt(4));
    var wakeSec = 59
    var pmCheck = wakeUpString.charAt(6);
    var sleptHours = 0;

    // Edge case for setting wake-up time to 12:00 AM & 12:30 AM
    if (pmCheck != "P" && wakeHour == 12) {
        wakeHour = 0;
    }

    // Sets conditional for all times except for 12:00 PM & 12:30 PM
    if (pmCheck == "P" && wakeHour != 12) {
        wakeHour += 12;
    }

    if (hour > wakeHour) {
        sleptHours = 24 - hour + wakeHour;

    } else if (hour < wakeHour) {
        sleptHours = wakeHour - hour;

    }

    var sleptMin = 0
    if (min > wakeMin) {
        var carryover = 1;
        sleptMin = (60 + wakeMin) - min;
    } else {
        var carryover = 0;
        sleptMin = wakeMin - min;
    }
    var sleptSec = 0
    if (sec > wakeSec) {
        sleptSec = (60 + wakeSec) - sec;
    } else {
        sleptSec = wakeSec - sec;
    }
    sleptHours = sleptHours - carryover;
    var totalSleep = (sleptHours) * 60 + sleptMin;
    var current_progress = (totalSleep / (parseInt(localStorage.getItem("Hours")) * 60)) * 100;
    document.getElementById("timeRemain").innerHTML = "Time Remaining: " + sleptHours + " hours " + sleptMin +
        " minutes " + sleptSec + " seconds";
    if (current_progress <= 0) {
        clearInterval(tRemain);
        document.getElementById("timeRemain").innerHTML = "Time Remaining: "
    }
}

// Percent related functions
$(document).ready(function () {
    $('#setButton').click(function () {
        clearInterval(percRemain);
        percRemain = setInterval(updatePercent, 300);
    });
});

function updatePercent() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    //var dropDown = document.getElementById("UserInput");
    localStorage.setItem("wakeString", dropDown.options[dropDown.selectedIndex].text);
    var wakeUpString = localStorage.getItem("wakeString"); //dropDown.options[dropDown.selectedIndex].text;
    var wakeHour = Number(wakeUpString.charAt(0) + wakeUpString.charAt(1));
    var wakeMin = Number(wakeUpString.charAt(3) + wakeUpString.charAt(4));
    var pmCheck = wakeUpString.charAt(6);
    var sleptHours = 0;

    // Edge case for setting wake-up time to 12:00 AM & 12:30 AM
    if (pmCheck != "P" && wakeHour == 12) {
        wakeHour = 0;
    }

    // Sets conditional for all times except for 12:00 PM & 12:30 PM
    if (pmCheck == "P" && wakeHour != 12) {
        wakeHour += 12;
    }

    if (hour > wakeHour) {
        sleptHours = 24 - hour + wakeHour;
    } else if (hour < wakeHour) {
        sleptHours = wakeHour - hour;
    }

    var sleptMin = 0
    if (min > wakeMin) {
        var carryover = 1;
        sleptMin = (60 + wakeMin) - min;
    } else {
        var carryover = 0;
        sleptMin = wakeMin - min;
    }

    var totalSleep = (sleptHours - carryover) * 60 + sleptMin;
    var current_progress = (totalSleep / 480) * 100;
    var avgsleep = localStorage.getItem("Hours");
    var current_progress = (totalSleep / (parseInt(localStorage.getItem("Hours")) * 60)) * 100;

    // Have percentage max out at 100 if the calculated percentage was 
    // greater than 100.
    if (current_progress > 100) {
        current_progress = 100;
    }

    document.getElementById("percent").innerHTML = "Energy (% of " + avgsleep + " hours of sleep)" + ": " +
        Math.round(current_progress * 10) / 10 + "%";

    if (current_progress <= 0) {
        clearInterval(percRemain);
        document.getElementById("percent").innerHTML = "Energy: "
    }

    return current_progress;
}

// initBar related functions
$(document).ready(function () {
    $('#setButton').click(function () {
        clearInterval(interval);
        interval = setInterval(initBar, 300);
    });
});

function initBar() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    //var dropDown = document.getElementById("UserInput");
    localStorage.setItem("wakeString", dropDown.options[dropDown.selectedIndex].text);
    var wakeUpString = localStorage.getItem("wakeString"); //dropDown.options[dropDown.selectedIndex].text;
    var wakeHour = Number(wakeUpString.charAt(0) + wakeUpString.charAt(1));
    var wakeMin = Number(wakeUpString.charAt(3) + wakeUpString.charAt(4));
    var pmCheck = wakeUpString.charAt(6);
    var sleptHours = 0;

    // Edge case for setting wake-up time to 12:00 AM & 12:30 AM
    if (pmCheck != "P" && wakeHour == 12) {
        wakeHour = 0;
    }

    // Sets conditional for all times except for 12:00 PM & 12:30 PM
    if (pmCheck == "P" && wakeHour != 12) {
        wakeHour += 12;
    }

    if (hour > wakeHour) {
        sleptHours = 24 - hour + wakeHour;

    } else if (hour < wakeHour) {
        sleptHours = wakeHour - hour;

    }

    var sleptMin = 0
    if (min > wakeMin) {
        var carryover = 1;
        sleptMin = (60 + wakeMin) - min;
    } else {
        var carryover = 0;
        sleptMin = wakeMin - min;
    }

    var totalSleep = (sleptHours - carryover) * 60 + sleptMin;
    //var current_progress = (totalSleep / 480) * 100;
    var current_progress = (totalSleep / (parseInt(localStorage.getItem("Hours")) * 60)) * 100;

    $("#bar").css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
    //.text(current_progress + "% Complete");
    
    if (current_progress <= 0) {
        clearInterval(interval);
        $("#bar").css("width", 0 + "%")
            .attr("aria-valuenow", 0)
    }
} /* scale this to wake up time */