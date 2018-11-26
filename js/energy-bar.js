/**
 * Will initialize the energy bar to an approximate energy percentage with
 * respect to the amount of time you intend to sleep.
 */
 function initBar() {
     //id.style.width = "100%";
     //$("#bar").css("width", 100 + "%");
     //$("#bar").attr("aria-valuenow", "100");

     /*$("#bar").css("width", 100 + "%");
     $("#bar").attr("aria-valuenow", "100");*/

     var interval = setInterval(function () {
       var date = new Date();
       var hour = date.getHours();
       var min = date.getMinutes();
       var dropDown = document.getElementById("UserInput");
       var wakeUpString = dropDown.options[dropDown.selectedIndex].text;
       var wakeHour = Number(wakeUpString.charAt(0) + wakeUpString.charAt(1));
       var wakeMin = Number(wakeUpString.charAt(3) + wakeUpString.charAt(4));
       var pmCheck = wakeUpString.charAt(6);
       var sleptHours = 0; /*Math.abs((24 - hour) + wakeHour);*/
       if (pmCheck == "P" && hour != 12) {
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
       var totalSleep = (sleptHours - carryover) * 60 + sleptMin;
       var current_progress = (totalSleep / 480) * 100;

       /*$("#bar").css("width", current_progress + "%")
         current_progress -= 1; //*/
         $("#bar").css("width", current_progress + "%")
             .attr("aria-valuenow", current_progress)
         //.text(current_progress + "% Complete");
         if (current_progress <= 0)
             clearInterval(interval);
     }, 300); //scale this to wake up time*/
    return current_progress;
}
