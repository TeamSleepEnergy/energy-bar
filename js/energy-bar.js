function initBar() {
    //id.style.width = "100%";
    //$("#bar").css("width", 100 + "%");
    //$("#bar").attr("aria-valuenow", "100");
    $("#bar").css("width", 100 + "%");
    $("#bar").attr("aria-valuenow", "100");
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dropDown = document.getElementById("UserInput");
    var wakeUpString = dropDown.options[dropDown.selectedIndex].text;
    var wakeHour = Number(wakeUpString.charAt(0) + wakeUpString.charAt(1));
    var wakeMin = Number(wakeUpString.charAt(3) + wakeUpString.charAt(4));
    var pmCheck = wakeUpString.charAt(6);

    // Calculate hours slept to energy percentage
    var sleptHours = 0; /*Math.abs((24 - hour) + wakeHour);*/
    if (pmCheck == "P") {
        wakeHour += 12;
    }
    if (hour > wakeHour) {
        sleptHours = 24 - hour + wakeHour;

    } else if (hour < wakeHour) {
        sleptHours = wakeHour - hour;
    }

    // Calculate minutes slept to energy percentage
    var sleptMin = 0;
    var carryover = 0;
    if (min > wakeMin) {
        carryover = 1;
        sleptMin = Math.abs((60 - min) + wakeMin);
    } else if (min == wakeMin) {
        carryover = 0;
        sleptMin = 0;
    } else {
        carryover = 0;
        sleptMin = wakeMin - min;
    }

    var totalSleep = (sleptHours - carryover) * 60 + sleptMin;
    var current_progress = 100 //parseInt($("#bar").css("width")); //replace this value with val relative to time

    if (totalSleep < 480) {
        current_progress = (totalSleep / 480) * 100;
    }

    $("#bar").css("width", current_progress + "%")
    var interval = setInterval(function () {
        current_progress -= 1; //
        $("#bar").css("width", current_progress + "%")
            .attr("aria-valuenow", current_progress)
        //.text(current_progress + "% Complete");
        if (current_progress <= 0)
            clearInterval(interval);
    }, 288000); //scale this to wake up time*/

    return current_progress;
}