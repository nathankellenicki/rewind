// Load dependencies
var ReactDOM = require("react-dom"),
    React = require("react");

// Load React components
var AppComponent = require("../shared/components/app.jsx");

// Exports
var Router = module.exports = Backbone.Router.extend({

    routes: {
        "*filter" : "setFilter"
    },

    setFilter: function (params) {

        ReactDOM.render(
            <AppComponent />,
            $("#app").get(0)
        );

    }

});