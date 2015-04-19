var Rewind = Rewind || {};

Rewind.Views = Rewind.Views || {};
Rewind.Views.App = require("./views/app");

module.exports = Rewind.Router = Backbone.Router.extend({
    routes: {
        "*filter" : "setFilter"
    },
    setFilter: function (params) {

        React.render(
            <Rewind.Views.App />,
            $("#app").get(0)
        );

    }
});