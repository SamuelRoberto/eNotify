/**
 * Functions
 */

/**
 * @description Write text in console
 * @function
 * @param {String} text Console.log message.
 */
function writeLog(text) {
    (logs) ? console.log(text) : null;
}

/**
 * @description Write debug text in console
 * @function
 * @param {String} text Console.log message.
 */
function debugLogs(text) {
    (debug) ? console.log('DEBUG: ' + text) : null;
}

/**
 * @description Send alert message on screen
 * @function
 * @param {String} type Alert type.
 * @param {String} bold Bold text.
 * @param {String} message Message Text.
 * @param {String} icon Font-Awesome icon.
 */
function alertMessage(type, bold, message, icon) {
    $('#alert-zone').append(
        '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' +
        ( icon ? '<i class="fa fa-' + icon + '" style="font-size: 2em; margin-right: 1em;" aria-hidden="true"></i>' : '') +
        '  <strong>' + bold + '</strong> ' + message +
        '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '    <span aria-hidden="true">&times;</span>' +
        '  </button>' +
        '</div>')
    $(".alert").alert();
}

/**
 * @description Send alert message on screen with a big size.
 * @function
 * @param {String} type Alert type.
 * @param {String} title Message title.
 * @param {String} message Message text.
 * @param {String} subMessage Sub-message text.
 */
function alertMessageMax(type, title, message, subMessage) {
    $('#alert-zone').append(
        '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' +
        '  <h4 class="alert-heading">' + title + '</h4>' +
        '  <p>' + message + '</p>' +
        '  <hr> ' +
        '  <p class="mb-0">' + subMessage + '</p>' +
        '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '    <span aria-hidden="true">&times;</span>' +
        '  </button>' +
        '</div>')
    $(".alert").alert();
}

/**
 * @description Send email to #email-input.val().
 * @function
 */
function sendNotify() {
    var email = $('#email-input').val();
    if(email && enableEmail){
        $.get({url: "http://enotice.alwaysdata.net/sendEmail.php?email=" + email})
            .done(function(data){
                debugLogs("SendNotify done: " + new Date().toLocaleString());
            });
    }
}