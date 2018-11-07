window.onload = function() {
    time(), setInterval(time, 1000);
};

/**
 * Convert from 24 hour format to 12 hour format
 * 
 * @param {*} hour 
 */
function twelveHourFormat(hour) {
    newHour = hour;

    if (hour > 12) {
        newHour = hour - 12;
    } else if (hour == 0) {
        newHour = 12;
    } else {
        // Do nothing
    }

    return newHour;
}

/**
 * Determines if time should be AM or PM depending on the passed-in hour
 * 
 * @param {*} hour 
 */
function ampm(hour) {
    if (hour >= 12) {
        return " PM";
    } else {
        return " AM";
    }
}

/**
 * Displays current time
 */
function time() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var ap = ampm(hour);

    newHour = twelveHourFormat(hour)

    if (minute <= 9) {
        minute = "0" + minute;
    }

    var clocktext = "" + newHour + ":" + minute + ap + "";
    document.getElementById('clockbox').innerHTML = clocktext;
}