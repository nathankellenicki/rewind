// Load React components
var AppComponent = require("./components/app.react");


// Exports
module.exports = Router = Backbone.Router.extend({

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