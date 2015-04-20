// Load React compoents
var UpdateComponent = require("./update.react");

// Makes sure an update has the required fields
var checkUpdateFormat = function (update) {

    var requiredFields = ["id", "timestamp", "text"];

    for (var i = 0; i < requiredFields.length; i++) {
        if (!update.get(requiredFields[i])) {
            return false;
        }
    }

    return true;

};

var TransitionGroupContainer = React.addons.TransitionGroup;


// Exports
module.exports = UpdatesListComponent = React.createClass({
    render: function () {

        var updateNodes = [];

        for (var i = 0; i < this.props.updates.length; i++) {
            var update = this.props.updates.at(i);
            if (checkUpdateFormat(update)) {
                updateNodes.push(
                    <UpdateComponent onDelete={this.props.onDelete} key={update.get("id")} id={update.get("id")} timestamp={update.get("timestamp")}>{update.get("text")}</UpdateComponent>
                );
            }
        }

        return (
            <TransitionGroupContainer component="ul" className="updates_list">
                {updateNodes}
            </TransitionGroupContainer>
        );

    }
});