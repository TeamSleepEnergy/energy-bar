// Activates Bootstrap popover
$('#health').popover({
    container: 'body',
    content: "Loading...",
    html: true,
    placement: 'bottom',
    trigger: 'focus'
});

/**
 * Health effect messages to be displayed when user clicks on "Health Effects"
 * popover. 
 * 
 * greenMessage: 75% - 100% energy range
 * yellowMessage: 45% - 74% energy range
 * redMessage: < 45% energy
 */
var greenMessage = "<ul> <li>Feel alert & awake throughout the day</li> <li>Optimal concentration when performing tasks</li> <li>You'll feel happier</li> </ul>";
var yellowMessage = "<ul> <li>Decreased attention and cognitive reasoning</li> <li>Sub-optimal physical performance</li> <li>Increased stress responses</li> </ul>";
var redMessage = "<ul> <li>Extreme grogginess</li> <li>Increased risk for heart disease, high blood pressure, and diabetes</li> <li>Lowered immune system; more likely you will get sick</li> </ul>";

/**
 * Upon every click or screen touch, the "Health Effects" message will 
 * change depending on the user's intended amount of sleep.
 */
$(document).on('click touch', function () {
    var percent = updatePercent();

    if (percent >= 75) {
        $('#health').attr('data-original-title', '75% - 100%')
        $('#health').attr('data-content', greenMessage);
    } else if (percent < 75 && percent >= 45) {
        $('#health').attr('data-original-title', '45% - 74%')
        $('#health').attr('data-content', yellowMessage);
    } else {
        $('#health').attr('data-original-title', '0% - 44%')
        $('#health').attr('data-content', redMessage);
    }
});