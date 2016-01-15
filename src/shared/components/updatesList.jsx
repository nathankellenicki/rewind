// Load dependencies
var React = require("react"),
    ReactCSSTransitionGroup = require("react-addons-css-transition-group");

// Load React compoents
var UpdateComponent = require("./update.jsx");

// Load actions
var UpdateActions = require("../../client/actions/update");

// Load utilities
var CommonFunctions = require("../utils/commonFunctions");

// Load stores
if (!CommonFunctions.isRunningOnServer()) {
    var UpdatesStore = require("../../client/stores/updates");
}


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


// Setup vars
var TransitionGroupContainer = ReactCSSTransitionGroup,
    syncTimer = null;
    //fetchInterval = 10000;


// Exports
var UpdatesListComponent = module.exports = React.createClass({

    _constructState: function () {

        if (CommonFunctions.isRunningOnServer()) {
            return {
                updates: this.props.serverRenderedUpdates
            }
        } else {
            return {
                updates: UpdatesStore.getAll()
            }
        }

    },

    _onChange: function () {
        this.setState(this._constructState());
    },

    pageMoreItems: function () {
        UpdateActions.page();
    },

    componentDidMount: function () {

        UpdatesStore.addChangeListener(this._onChange);
        UpdateActions.sync();

        //syncTimer = setInterval(function () {
        //    UpdateActions.sync();
        //}, fetchInterval);

    },

    componentWillUnmount: function () {
        UpdatesStore.removeChangeListener(this._onChange);
        //clearInterval(syncTimer);
        syncTimer = null;
    },

    getInitialState: function () {
        UpdateActions.changeURL(this.props.endpoint);
        return this._constructState();
    },

    render: function () {

        var updateNodes = [];

        for (var i = 0; i < this.state.updates.length; i++) {
            var update = this.state.updates.at(i);
            if (checkUpdateFormat(update)) {
                updateNodes.push(
                    <UpdateComponent key={update.get("id")} id={update.get("id")} timestamp={update.get("timestamp")} username={update.get("username")} url={update.get("url")}>{update.get("text")}</UpdateComponent>
                );
            }
        }

        return (
            <div className="updates">
                <TransitionGroupContainer component="ul" className="updates_list" transitionName="fading" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
                    {updateNodes}
                </TransitionGroupContainer>
                <div className="paging">
                    <button className="page_button" onClick={this.pageMoreItems}>More Items</button>
                </div>
            </div>
        );

    }

});