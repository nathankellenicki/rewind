// Load dependencies
var React = require("react/addons");

// Load actions
var UpdateActions = require("../../client/actions/update");

// Load utility functions
var prettyDate = require("../utils/prettyDate");

// Setup vars
var renderTimer,
    renderInterval = 30000;


// Exports
var UpdateComponent = module.exports = React.createClass({

    _handleDelete: function (e) {

        e.preventDefault();
        UpdateActions.destroy(this.props.id);

    },

    componentDidMount: function () {

        var ref = this;

        // We force an update every so often in order to keep displayed date/times relatively up to date
        this.renderTimer = setInterval(function () {
            ref.forceUpdate.call(ref);
        }, renderInterval);

    },

    componentWillUnmount: function () {
        clearInterval(this.renderTimer);
    },

    render: function () {
        return (
            <li className="update_box">
                <div className="update">
                    <span className="content">{this.props.children}</span>
                </div>
                <div className="options">
                    <button className="delete" onClick={this._handleDelete}>Delete</button>
                    <div className="info">
                        <span className="timestamp">{prettyDate(new Date(this.props.timestamp))}</span> by <span className="username"><a href="http://nathankunicki.com/rewind/">@nathankunicki</a></span>
                    </div>
                </div>
            </li>
        );
    }

});