// Load dependencies
var React = require("react/addons");

// Load actions
var AuthActions = require("../../client/actions/auth");

// Load constants
var AuthConstants = require("../../client/constants/auth");

// Load utilities
var CommonFunctions = require("../utils/commonFunctions");

// Load stores
if (!CommonFunctions.isRunningOnServer()) {
    var AuthStore = require("../../client/stores/auth");
}


// Exports
var HeaderComponent = module.exports = React.createClass({

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

    handleLogin: function (e) {
        e.preventDefault();
        AuthActions.signIn(prompt("Please enter your email address:"), prompt("Please enter your password:")); // This is so very very hacky, replace it with a form
    },

    handleLogout: function (e) {
        e.preventDefault();
        AuthActions.signOut();
    },

    componentDidMount: function () {
        AuthStore.addEventListener(AuthConstants.SIGN_IN_SUCCESS_EVENT, this._onSignInOutSuccess);
        AuthStore.addEventListener(AuthConstants.SIGN_OUT_EVENT, this._onSignInOutSuccess);
    },

    componentWillUnmount: function () {
        AuthStore.removeEventListener(AuthConstants.SIGN_IN_SUCCESS_EVENT, this._onSignInOutSuccess);
        AuthStore.removeEventListener(AuthConstants.SIGN_OUT_EVENT, this._onSignInOutSuccess);
    },

    getInitialState: function () {
        return this._constructState();
    },

    render: function () {

        if (this.state.signedIn) {
            var loginButton = <button className="logout" onClick={this.handleLogout}>Sign Out</button>,
                loginText = <span>Signed in as <a href={this.state.user.url}>@{this.state.user.username}</a></span>
        } else {
            var loginButton = <button className="login" onClick={this.handleLogin}>Sign In</button>,
                loginText = <span>Not signed in</span>
        }

        return (
            <div className="header_container">
                <div className="user_details">
                    {loginText}
                    {loginButton}
                </div>
            </div>
        );
    }
});