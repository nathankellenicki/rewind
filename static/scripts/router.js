var Rewind = Rewind || {};

(function () {

    Rewind.Router = Backbone.Router.extend({
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

})();