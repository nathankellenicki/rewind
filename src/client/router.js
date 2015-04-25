// Load dependencies
var React = require("react/addons");

// Load React components
var AppComponent = require("../shared/components/app.jsx");


// Exports
var Router = module.exports = Backbone.Router.extend({

    routes: {
        "*filter" : "setFilter"
    },

    setFilter: function (params) {

        React.render(
            <AppComponent />,
            $("#app").get(0)
        );

    }

});