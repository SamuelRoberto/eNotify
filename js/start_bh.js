/**
 * StartBH
 */

/**
 * @description Loading state of Black Hour.
 * @function
 */
function loadingState(){
    $.get({url: "https://firestore.googleapis.com/v1beta1/projects/" + firebaseProjectId +
    "/databases/(default)/documents/" + firebaseCampaignCollection + "/1",
        crossDomain: false,
        xhrFields: { withCredentials: false }})
        .done(function(data){
            debugLogs("Loading State done: " + new Date().toLocaleString());
            var state = data.fields.stato_periodo.integerValue;
            $('#loading').hide();
            if(isBlackHourDay())
                switch(parseInt(state)){
                    case 1:
                        $('#onlineBH').hide();
                        $('#endedBH').hide();
                        $('#notAvailableBH').hide();
                        $('#offlineBH').show();
                        break;
                    case 2:
                        $('#offlineBH').hide();
                        $('#endedBH').hide();
                        $('#notAvailableBH').hide();
                        $('#onlineBH').show();
                        break;
                    case 3:
                        $('#offlineBH').hide();
                        $('#onlineBH').hide();
                        $('#notAvailableBH').hide();
                        $('#endedBH').show();
                        break;
                    default:
                        notAvailableBH()
                }
            else{
                notAvailableBH()
            }
        });
}

/**
 * @description Check if today is Black Hour day.
 * @function
 * @returns {boolean}
 */
function isBlackHourDay(){
    var dateStart = new Date('11-06-2017').getTime();
    var dateEnd = new Date('11-24-2017').getTime();
    var today = new Date().getTime();

    debugLogs('Loading StartDate: ' + dateStart);
    debugLogs('Loading EndDate: ' + dateEnd);
    debugLogs('Loading TodayDate: ' + + today);

    if (today > dateStart && today < dateEnd)
        return true;
    else
        return false;
}
/**
 * @description Check if Black Hour is Active.
 * @function
 */
function checkBH(){
    $.get({url: "https://firestore.googleapis.com/v1beta1/projects/" + firebaseProjectId +
    "/databases/(default)/documents/" + firebaseCampaignCollection + "/1",
        crossDomain: false,
        xhrFields: { withCredentials: false }})
        .done(function(data){
            debugLogs("CheckBH done: " + new Date().toLocaleString());

            hoursBH = new Date(data.fields.data_fine_periodo.timestampValue).getHours();
            minutesBH = new Date(data.fields.data_fine_periodo.timestampValue).getMinutes();
            state = data.fields.stato_periodo.integerValue;
            if(isBlackHourDay()) {
                if (state == 2) {
                    activeBH(hoursBH, minutesBH);
                } else if (state == 3) {
                    endedBH();
                }
            }else
                notAvailableBH();
        });
}

/**
 * @description When Black Hour is ended, check if is started a new day.
 * @function
 */
function checkNewDay(){
    $.get({url: "https://firestore.googleapis.com/v1beta1/projects/" + firebaseProjectId +
    "/databases/(default)/documents/" + firebaseCampaignCollection + "/1",
        crossDomain: false,
        xhrFields: { withCredentials: false }})
        .done(function(data){
            debugLogs("CheckNewDay done: " + new Date().toLocaleString());

            hoursBH = new Date(data.fields.data_fine_periodo.timestampValue).getHours();
            minutesBH = new Date(data.fields.data_fine_periodo.timestampValue).getMinutes();
            state = data.fields.stato_periodo.integerValue;
            if(state == 1)
                findingBH();
            else if(state == 2)
                activeBH(true, hoursBH, minutesBH);
        });
}

/**
 * @description Triggered when Black Hour is active: send e-mail and set refreshCheckProduct more frequently.
 * @function
 * @param {Integer} hours Hours value
 * @param {Integer} minutes Minutes value
 */
function activeBH(hours, minutes){
    hoursDef = hours;
    minutesDef = minutes;

    $('#offlineBH').hide();
    $('#endedBH').hide();
    $('#notAvailableBH').hide();
    $('#onlineBH').show();
    clearInterval(refreshCheckBH);
    clearInterval(refreshCheckProduct);
    refreshCheckProduct = setInterval(checkProduct, refreshCheckProductTimeActive)
    writeLog("Black Hour iniziata: " + new Date().toLocaleString());
    sendNotify();
}

/**
 * @description Triggered when start a new day: start to find another Black Hour.
 * @function
 */
function findingBH(){
    $('#endedBH').hide();
    $('#notAvailableBH').hide();
    $('#onlineBH').hide();
    $('#offlineBH').show();
    clearInterval(refreshCheckNewDay);
    refreshCheckBHTime = setInterval(checkBH, refreshCheckBHTime)
}

/**
 * @description Triggered when Black Hour finish: start to find a new day.
 * @function
 */
function endedBH(){
    $('#notAvailableBH').hide();
    $('#onlineBH').hide();
    $('#offlineBH').hide();
    $('#endedBH').show();
    clearInterval(refreshCheckProduct);
    refreshCheckNewDay = setInterval(checkNewDay, refreshCheckNewDayTime)
}

/**
 * @description Triggered when Black Hour is not available.
 */
function notAvailableBH(){
    $('#onlineBH').hide();
    $('#offlineBH').hide();
    $('#endedBH').hide();
    $('#notAvailableBH').show();
    clearInterval(refreshCheckBH);
    clearInterval(refreshCheckProduct);
}