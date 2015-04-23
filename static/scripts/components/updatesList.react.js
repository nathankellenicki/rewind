// Load React compoents
var UpdateComponent = require("./update.react");

// Load actions
var UpdateActions = require("../actions/update");

// Load stores
var UpdatesStore = require("../stores/updates");


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


// Fetch current state from store
var constructState = function () {
    return {
        updates: UpdatesStore.getAll()
    }
};


var TransitionGroupContainer = React.addons.TransitionGroup,
    syncTimer = null,
    fetchInterval = 10000;


// Exports
module.exports = UpdatesListComponent = React.createClass({

    _onChange: function () {
        this.setState(constructState());
    },

    componentDidMount: function () {
        UpdatesStore.addChangeListener(this._onChange);

        UpdateActions.sync();

        syncTimer = setInterval(function () {
            UpdateActions.sync();
        }, fetchInterval);

    },

    componentWillUnmount: function () {
        UpdatesStore.removeChangeListener(this._onChange);
        clearInterval(syncTimer);
        syncTimer = null;
    },

    getInitialState: function () {
        UpdateActions.changeURL(this.props.endpoint);
        return constructState();
    },

    render: function () {

        var updateNodes = [];

        for (var i = 0; i < this.state.updates.length; i++) {
            var update = this.state.updates.at(i);
            if (checkUpdateFormat(update)) {
                updateNodes.push(
                    <UpdateComponent key={update.get("id")} id={update.get("id")} timestamp={update.get("timestamp")}>{update.get("text")}</UpdateComponent>
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