// Load React components
var YourUpdatesComponent = require("./yourUpdates.react");


// Exports
module.exports = AppComponent = React.createClass({
    render: function () {
        return (
            <YourUpdatesComponent url="/api/updates" />
        );
    }
});