// Load router
var Router = require("./router");

// Wait until the DOM is ready before starting
$(document).ready(function () {

    router = new Router();

    Backbone.history.start({
        root: "/",
        pushState: true
    });

    console.log("Rewind started");

});