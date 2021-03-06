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
        localStorage.setItem("wakeSelect", dropDown.selectedIndex);
    });
});

$(document).ready(function () {
    if (localStorage.getItem("running") == 1) {
        dropDown.selectedIndex = localStorage.getItem("wakeSelect");
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
    localStorage.setItem("wakeString", dropDown.options[dropDown.selectedIndex].text);
    var wakeUpString = localStorage.getItem("wakeString"); 
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
    localStorage.setItem('day', (date.getMonth() +1) +"/" +date.getDate());
}

// Time remaining related functions
$(document).ready(function () {
    $('#setButton').click(function () {
        clearInterval(tRemain);
        tRemain = setInterval(updateTime, 300);
    });
});

function updateTime() {
    localStorage.setItem("wakeSelect", dropDown.selectedIndex);
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes() + 1;
    var sec = date.getSeconds();
    localStorage.setItem("wakeString", dropDown.options[dropDown.selectedIndex].text);
    var wakeUpString = localStorage.getItem("wakeString"); 
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

    document.getElementById("timeRemain").innerHTML = "<b>SLEEP TIME REMAINING</b>: <span>" + sleptHours + " hours, " + sleptMin + " minutes, " + sleptSec + " seconds</span>";

    if (current_progress <= 0) {
        clearInterval(tRemain);
        document.getElementById("timeRemain").innerHTML = "SLEEP TIME REMAINING: "
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
    localStorage.setItem("wakeString", dropDown.options[dropDown.selectedIndex].text);
    var wakeUpString = localStorage.getItem("wakeString"); 
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

    var percent_value = Math.round(current_progress * 10) / 10;
    var percent_value_str = percent_value.toString().fixed();

    document.getElementById("percent").innerHTML = "<b>ENERGY</b>: (<span>" + percent_value_str + "%</span> per " + avgsleep + " hours of sleep)";

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
    localStorage.setItem("wakeString", dropDown.options[dropDown.selectedIndex].text);
    var wakeUpString = localStorage.getItem("wakeString"); 
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
    var current_progress = (totalSleep / (parseInt(localStorage.getItem("Hours")) * 60)) * 100;

    $("#bar").css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
    
    // Changes color of energy bar in different percentage ranges.
    // 75%-100% (green)
    // 45%-74% (orange)
    // 0%-45% (red)
    if (current_progress >= 75) {
        $(".progress-bar").css("background", "#5cd65c")
    } else if (current_progress < 75 && current_progress >= 45) {
        $(".progress-bar").css("background", "#ff9933")
    } else {
        $(".progress-bar").css("background", "#ff0066")
    }

    if (current_progress <= 0) {
        clearInterval(interval);
        $("#bar").css("width", 0 + "%")
            .attr("aria-valuenow", 0)
    }
}

// Window alert when user clicks on 'Going to Sleep!' button
$('#gotosleep').on('click touch', function() {
    alert("Data recorded! Please go to the 'Data' page to view your data.");
})
