/**
 * Init
 */

document.addEventListener("DOMContentLoaded", function(event) {
    // Loading State
    loadingState();

    // Refresh ID Vars
    refreshCheckBH = setInterval(checkBH, refreshCheckBHTime);
    // Refresh Products
    refreshCheckProduct = setInterval(checkProduct, refreshCheckProductTime);
});