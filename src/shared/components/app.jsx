// Load dependencies
var React = require("react/addons");

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