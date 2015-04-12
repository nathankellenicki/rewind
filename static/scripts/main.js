"use strict";

var UpdatesBox = React.createClass({

    handleUpdateSubmit: function (text) {

        var updates = this.state.updates;
        var newUpdates = [{
            timestamp: (new Date()).toISOString(),
            text: text
        }].concat(updates);

        this.setState({
            updates: newUpdates
        });

        $.ajax({
            url: this.props.url,
            dataType: "json",
            type: "POST",
            data: {
                text: text
            },
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    },

    loadUpdatesFromServer: function () {

        $.ajax({
            url: this.props.url,
            dataType: "json",
            success: function (data) {
                this.setState({
                    updates: data.updates
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    },

    getInitialState: function () {
        return {updates: []};
    },

    componentDidMount: function () {
        this.loadUpdatesFromServer();
        setInterval(this.loadUpdatesFromServer, this.props.pollInterval);
    },

    render: function () {
        return (
            <div className="updates_box">
                <h1>My Updates</h1>
                <UpdateForm onUpdateSubmit={this.handleUpdateSubmit} />
                <UpdatesList data={this.state.updates} />
            </div>
        );
    }

});

var UpdatesList = React.createClass({
    render: function () {

        var updateNodes = this.props.data.map(function (update) {
            return (
                <Update key={update.id} timestamp={update.timestamp}>{update.text}</Update>
            );
        });

        return (
            <div className="updates_list">
                {updateNodes}
            </div>
        );

    }
});

var Update = React.createClass({
    render: function () {
        return (
            <div className="update">
                <p>{this.props.children} - <span className="update_timestamp">{this.props.timestamp}</span></p>
            </div>
        );
    }
});

var UpdateForm = React.createClass({

    handleSubmit: function (e) {

        e.preventDefault();
        var text = React.findDOMNode(this.refs.text).value.trim();

        if (!text) {
            return;
        }

        this.props.onUpdateSubmit(text);
        React.findDOMNode(this.refs.text).value = '';

        return;

    },

    render: function () {
        return (
            <form className="update_form" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Status" ref="text"/>
                <input type="submit" value="Post" />
            </form>
        );
    }
});


React.render(
    <UpdatesBox url="/api/updates" pollInterval={2000} />,
    document.getElementById("content")
);