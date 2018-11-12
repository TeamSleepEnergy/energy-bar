/**
 * Will provide a window alert when the energy bar is in the yellow
 * (45%-75%) and red (0%-44%) ranges.
 */
function percentAlert() {
    var energyPercent = initBar();
    if (energyPercent < 75 && energyPercent >= 45) {
        alert("Energy changed to yellow");
    } else if (energyPercent < 44) {
        alert("Energy changed to red. Be careful.");
    }
}