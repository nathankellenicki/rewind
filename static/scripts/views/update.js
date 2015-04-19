var Rewind = Rewind || {};

Rewind.Views = Rewind.Views || {};

(function () {

    var rerenderTimer = 30000;

    Rewind.Views.Update = React.createClass({

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

        render: function () {
            return (
                <li className="update_box">
                    <div className="update">
                        <span className="content">{this.props.children}</span>
                    </div>
                    <div className="options">
                        <div className="info">
                            <span className="timestamp">{Rewind.Utils.prettyDate(new Date(this.props.timestamp))}</span> by <span className="username"><a href="http://nathankunicki.com/rewind/">@nathankunicki</a></span>
                        </div>
                    </div>
                </li>
            );
        }

    });

})();