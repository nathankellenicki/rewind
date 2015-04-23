// Exports
module.exports = getCurrentLocation = function (callback) {

    if (navigator.geolocation) {

        // Try to get the location from the browser
        navigator.geolocation.getCurrentPosition(function (position) {
            callback(null, {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });

    } else {

        // Use the server to determine rough location from IP address as a fallback
        callback(true);

    }

    return false;

};