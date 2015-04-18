var Rewind = Rewind || {};

Rewind.Views = Rewind.Views || {};

(function () {

    Rewind.Views.Update = React.createClass({
        render: function () {
            return (
                <li className="update">
                    <p>{this.props.children} - <span className="update_timestamp">{this.props.timestamp}</span></p>
                </li>
            );
        }
    });

})();