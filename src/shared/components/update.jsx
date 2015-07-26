// Load dependencies
var React = require("react/addons");

// Load actions
var UpdateActions = require("../../client/actions/update");

// Load constants
var AuthConstants = require("../constants/auth");

// Load utilities
var CommonFunctions = require("../utils/commonFunctions");

// Load stores
if (!CommonFunctions.isRunningOnServer()) {
    var AuthStore = require("../../client/stores/auth");
}

// Load utility functions
var prettyDate = require("../utils/prettyDate"),
    Autolinker = require("autolinker");

// Instantiate classes
var autolinker = new Autolinker({
    className: "autolink",
    twitter: false,
    urls: true,
    hashtag: "twitter",
    replaceFn: function (autolinker, match) {

        console.log(match.getType());

        switch (match.getType()) {
            case "hashtag":
                console.log("Doing");
                var hashtag = match.getHashtag();
                return "<a href=\"/hashtag/" + hashtag + "\">&#x23;" + hashtag + "</a>";
        }

    }
});

// Setup vars
var renderTimer,
    renderInterval = 30000;


// Takes a string containing valid HTML and wraps it in an object to be passed to React's dangerouslySetInnerHTML call
var wrapDangerousHTML = function (htmlStr) {
    return {
        __html: htmlStr
    }
};


// Exports
var UpdateComponent = module.exports = React.createClass({

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

    getInitialState: function () {
        return this._constructState();
    },

    _handleDelete: function (e) {

        e.preventDefault();
        UpdateActions.destroy(this.props.id);

    },

    componentDidMount: function () {

        var ref = this;

        AuthStore.addEventListener(AuthConstants.Events.SIGN_IN_SUCCESS_EVENT, this._onSignInOutSuccess);
        AuthStore.addEventListener(AuthConstants.Events.SIGN_OUT_EVENT, this._onSignInOutSuccess);

        // We force an update every so often in order to keep displayed date/times relatively up to date
        this.renderTimer = setInterval(function () {
            ref.forceUpdate.call(ref);
        }, renderInterval);

    },

    componentWillUnmount: function () {

        AuthStore.removeEventListener(AuthConstants.Events.SIGN_IN_SUCCESS_EVENT, this._onSignInOutSuccess);
        AuthStore.removeEventListener(AuthConstants.Events.SIGN_OUT_EVENT, this._onSignInOutSuccess);

        clearInterval(this.renderTimer);

    },

    render: function () {

        if (this.state.signedIn && this.state.user.username == this.props.username) {
            var deleteButton = <button className="delete" onClick={this._handleDelete}>Delete</button>;
        } else {
            var deleteButton = null;
        }

        return (
            <li className="update_box">
                <div className="update">
                    <span className="content" dangerouslySetInnerHTML={wrapDangerousHTML(autolinker.link(this.props.children))}></span>
                </div>
                <div className="options">
                    {deleteButton}
                    <div className="info">
                        <span className="timestamp">{prettyDate(new Date(this.props.timestamp))}</span> by <span className="username"><a href={this.props.url}>@{this.props.username}</a></span>
                    </div>
                </div>
            </li>
        );
    }

});