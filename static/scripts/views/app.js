var Rewind = Rewind || {};

Rewind.Views = Rewind.Views || {};

Rewind.Views.MyUpdates = require("./myUpdates");

module.exports = Rewind.Views.App = React.createClass({
    render: function () {
        return (
            <Rewind.Views.MyUpdates url="/api/updates" />
        );
    }
});