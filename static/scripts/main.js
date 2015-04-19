var Rewind = Rewind || {};

Rewind.Router = require("./router");

$(document).ready(function () {

    Rewind.router = new Rewind.Router();

    Backbone.history.start({
        root: "/",
        pushState: true
    });

    console.log("Rewind started");

});