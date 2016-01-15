// Load dependencies
var ReactDOM = require("react-dom"),
    React = require("react");

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

    ReactDOM.render(
        <HeaderComponent />,
        $("#main_header").get(0)
    );

    console.log("Rewind started");

});