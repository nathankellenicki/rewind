// Load dependencies
var ReactDOM = require("react-dom"),
    React = require("react");

// Load React components
var AppComponent = require("../shared/components/app.jsx");

// Load actions
var UpdateAtions = require("./actions/update");


// Exports
var Router = module.exports = Backbone.Router.extend({

    routes: {
        "": "root",
        ":user": "user"

    },

    root: function () {

        ReactDOM.render(
            <AppComponent />,
            $("#app").get(0)
        );

    },

    user: function (user) {

        ReactDOM.render(
            <AppComponent updatesUrl={"/api/" + user + "/updates"} />,
            $("#app").get(0)
        );

    }

});