// Load dependencies
var React = require("react/addons");

// Setup vars
var loggedIn = false,
    userDetails = {};

// Exports
var HeaderComponent = module.exports = React.createClass({
    render: function () {

        if (loggedIn) {
            var loginButton = <button className="logout" onClick={this.handleLogout}>Logout</button>,
                loginText = <span>Logged in as <a href="/">@nathankunicki</a></span>
        } else {
            var loginButton = <button className="login" onClick={this.handleLogin}>Login</button>,
                loginText = <span>Not logged in</span>
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