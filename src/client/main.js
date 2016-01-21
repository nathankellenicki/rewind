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


// Add anchor onClick's to intercept relative url's
$(document).on("click", "a[href]:not([data-bypass])", function (e) {

    // Get the absolute anchor href
    var href = {
        prop: $(this).prop("href"),
        attr: $(this).attr("href")
    };

    // Get the absolute root
    var root = location.protocol + "//" + location.host + "/";

    // Ensure the root is part of the anchor href, meaning it's relative
    if (href.prop.slice(0, root.length) == root) {

        e.preventDefault();
        Backbone.history.navigate(href.attr.slice(root.length), true);

    }
});