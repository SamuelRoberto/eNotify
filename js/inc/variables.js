/**
 * Variables
 */

//Firebase Variables
var firebaseProjectId = 'eprice-firebase';
var firebaseCollection = 'blackHourProducts';
var firebaseCampaignCollection = 'blackFridayCampaign';

//Global
var logs = true;
var debug = false;

// StartBH
var enableEmail = true;
var hoursBH, minutesBH;
var hoursDef = 0;
var minutesDef = 0;

// Products
var blackProducts = [];

// Timers
var refreshCheckBH, refreshCheckNewDay, refreshCheckProduct;
var refreshCheckBHTime = 1000 * 30;        // REFRESH TIME: CHECK IF BLACK HOUR IS ACTIVE -> Actual: 30sec
var refreshCheckNewDayTime = 1000 * 30;    // REFRESH TIME: CHECK IF IS NEW DAY -> Actual: 30sec
var refreshCheckProductTime = 1000 * 20;   // REFRESH TIME: PRODUCTS WHEN BLACK HOUR IS NOT ACTIVE -> Actual 20sec
var refreshCheckProductTimeActive = 700;   // REFRESH TIME: PRODUCTS WHEN BLACK HOUR IS ACTIVE -> Actual: 700ms