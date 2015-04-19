var Rewind = Rewind || {};

Rewind.Views = Rewind.Views || {};

(function () {

    Rewind.Views.App = React.createClass({
        render: function () {
            return (
                <Rewind.Views.MyUpdates url="/api/updates" />
            );
        }
    });

})();