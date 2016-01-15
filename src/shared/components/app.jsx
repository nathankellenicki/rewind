// Load dependencies
var React = require("react");

// Load React components
var YourUpdatesComponent = require("./yourUpdates.jsx");


// Exports
var AppComponent = module.exports = React.createClass({
    render: function () {
        return (
            <YourUpdatesComponent url="/api/updates" />
        );
    }
});