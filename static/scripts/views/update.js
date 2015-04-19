var Rewind = Rewind || {};

Rewind.Views = Rewind.Views || {};
Rewind.Utils = Rewind.Utils || {};
Rewind.Utils.prettyDate = require("../utils/prettyDate");

var rerenderTimer = 30000;

module.exports = Rewind.Views.Update = React.createClass({

    componentWillEnter: function (callback) {

        var $el = $(this.getDOMNode());

        $el.fadeIn(500, function () {
            callback();
        });

    },

    componentWillLeave: function (callback) {

        var $el = $(this.getDOMNode());

        $el.fadeOut(500, function () {
            callback();
        });

    },

    componentDidMount: function () {

        var ref = this;

        // We force an update every so often in order to keep displayed date/times relatively up to date
        this.rerenderTimer = setInterval(function () {
            ref.forceUpdate.call(ref);
        }, rerenderTimer);

    },

    componentWillUnmount: function () {
        clearInterval(this.rerenderTimer);
    },

    handleDelete: function (e) {
        e.preventDefault();
        this.props.onDelete(this.props.id);
    },

    render: function () {
        return (
            <li className="update_box" style={{display: "none"}}>
                <div className="update">
                    <span className="content">{this.props.children}</span>
                </div>
                <div className="options">
                    <button className="delete" onClick={this.handleDelete}>Delete</button>
                    <div className="info">
                        <span className="timestamp">{Rewind.Utils.prettyDate(new Date(this.props.timestamp))}</span> by <span className="username"><a href="http://nathankunicki.com/rewind/">@nathankunicki</a></span>
                    </div>
                </div>
            </li>
        );
    }

});