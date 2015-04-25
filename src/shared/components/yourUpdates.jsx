// Load dependencies
var React = require("react/addons");

// Load React components
var UpdateFormComponent = require("./updateForm.jsx"),
    UpdatesListComponent = require("./updatesList.jsx");


// Define the server endpoint to hit for "Your Updates"
var endpoint = "/api/updates";

// Exports
var YourUpdatesComponent = module.exports = React.createClass({
    render: function () {
        return (
            <div className="my_updates">
                <UpdateFormComponent />
                <UpdatesListComponent endpoint={endpoint} serverRenderedUpdates={this.props.serverRenderedUpdates} />
            </div>
        );
    }
});