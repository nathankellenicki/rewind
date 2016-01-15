// Load dependencies
var React = require("react");

// Load React components
var UpdateFormComponent = require("./updateForm.jsx"),
    UpdatesListComponent = require("./updatesList.jsx");

// Load constants
var AuthConstants = require("../../shared/constants/auth");

// Load utilities
var CommonFunctions = require("../utils/commonFunctions");

// Load stores
if (!CommonFunctions.isRunningOnServer()) {
    var AuthStore = require("../../client/stores/auth");
}


// Define the server endpoint to hit for "Your Updates
var endpoint = "/api/updates";

// Exports
var YourUpdatesComponent = module.exports = React.createClass({

    _constructState: function () {

        if (CommonFunctions.isRunningOnServer()) {
            return {
                signedIn: false
            }
        } else {
            return {
                signedIn: AuthStore.isSignedIn(),
                user: AuthStore.getUser()
            }
        }

    },

    _onSignInOutSuccess: function () {
        this.setState(this._constructState());
    },

    componentDidMount: function () {
        AuthStore.addEventListener(AuthConstants.Events.SIGN_IN_SUCCESS_EVENT, this._onSignInOutSuccess);
        AuthStore.addEventListener(AuthConstants.Events.SIGN_OUT_EVENT, this._onSignInOutSuccess);
    },

    componentWillUnmount: function () {
        AuthStore.removeEventListener(AuthConstants.Events.SIGN_IN_SUCCESS_EVENT, this._onSignInOutSuccess);
        AuthStore.removeEventListener(AuthConstants.Events.SIGN_OUT_EVENT, this._onSignInOutSuccess);
    },

    getInitialState: function () {
        return this._constructState();
    },

    render: function () {

        if (this.state.signedIn) {
            var updateForm = <UpdateFormComponent />;
        } else {
            var updateForm = null;
        }

        return (
            <div className="my_updates">
                {updateForm}
                <UpdatesListComponent endpoint={endpoint} serverRenderedUpdates={this.props.serverRenderedUpdates} />
            </div>
        );
    }

});