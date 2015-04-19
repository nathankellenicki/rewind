var Rewind = Rewind || {};

Rewind.Router = require("./router");

window.onload = (function () {

    Rewind.router = new Rewind.Router();

    Backbone.history.start({
        root: "/",
        pushState: true
    });

    console.log("Rewind started");

})();