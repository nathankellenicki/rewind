// Load dependencies
var React = require("react/addons");

// Load constants
var UpdateConstants = require("../constants/update");


// Exports
var UpdateFormComponent = module.exports = React.createClass({

    getInitialState: function () {
        return null;
    },

    render: function () {

        return (
            <div className="visibility_box">
                <ul>
                    <li className="public"><a href="#" onClick={this.props.setVisibility}>Public</a></li>
                    <li className="friends"><a href="#" onClick={this.props.setVisibility}>Friends</a></li>
                    <li className="private"><a href="#" onClick={this.props.setVisibility}>Private</a></li>
                </ul>
            </div>
        );
    }

});


