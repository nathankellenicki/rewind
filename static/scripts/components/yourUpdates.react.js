// Load React components
var UpdateFormComponent = require("../components/updateForm.react"),
    UpdatesListComponent = require("../components/updatesList.react");


// Define the server endpoint to hit for "Your Updates"
var endpoint = "/api/updates"

// Exports
module.exports = YourUpdatesComponent = React.createClass({
    render: function () {
        return (
            <div className="my_updates">
                <UpdateFormComponent />
                <UpdatesListComponent endpoint={endpoint} />
            </div>
        );
    }
});