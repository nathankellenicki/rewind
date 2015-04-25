// Load dependencies
var React = require("react/addons");

// Load router
var Router = require("./router");

// Load React components
var HeaderComponent = require("../shared/components/header.jsx");

// Wait until the DOM is ready before starting
$(document).ready(function () {

    router = new Router();

    Backbone.history.start({
        root: "/",
        pushState: true
    });

    React.render(
        <HeaderComponent />,
        $("#main_header").get(0)
    );

    console.log("Rewind started");

});