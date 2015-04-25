// Load dependencies
var http = require("http");

var Heroku = module.exports = {

    createKeepAlive: function (url, interval) {

        setInterval(function () {
            http.get(url);
            console.log("Heroku keep-alive triggered");
        }, interval || 240000);

    }

}