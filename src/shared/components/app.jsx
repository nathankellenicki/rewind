// Load dependencies
var React = require("react");

// Load React components
var YourUpdatesComponent = require("./yourUpdates.jsx");


// Exports
module.exports = AppComponent = React.createClass({
    render: function () {

        return (
            <YourUpdatesComponent url={this.props.updatesUrl || "/api/updates"} />
        );
    }
});