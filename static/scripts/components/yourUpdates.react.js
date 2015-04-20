// Load models
var UpdateModel = require("../models/update");

// Load collections
var UpdatesCollection = require("../collections/updates");

// Load React components
var UpdateFormComponent = require("../components/updateForm.react"),
    UpdatesListComponent = require("../components/updatesList.react");

// This mixing allows Backbone updates to trigger React renders
var BackboneMixin = require("../utils/backboneMixin");

// Setup vars
var fetchInterval = 10000;


// Exports
module.exports = YourUpdatesCompoent = React.createClass({

    mixins: [BackboneMixin],

    getBackboneModels: function () {
        return [this.state.updates];
    },

    handleUpdateSubmit: function (text) {

        var update = new UpdateModel({
            timestamp: (new Date()).toISOString(),
            text: text
        });

        this.state.updates.add(update);
        update.save();

    },

    handleDelete: function (id) {
        var update = this.state.updates.get(id);
        update.destroy();
    },

    getInitialState: function () {

        var updatesCollection = new UpdatesCollection({
            url: "/api/updates"
        });

        return {
            updates: updatesCollection
        };
    },

    componentDidMount: function () {

        var ref = this;

        ref.state.updates.fetch();

        this.fetchTimer = setInterval(function () {
            ref.state.updates.fetch();
        }, fetchInterval);

    },

    componentWillUnmount: function () {
        clearInterval(this.fetchTimer);
    },

    render: function () {

        return (
            <div className="my_updates">
                <UpdateFormComponent onUpdateSubmit={this.handleUpdateSubmit} />
                <UpdatesListComponent onDelete={this.handleDelete} updates={this.state.updates} />
            </div>
        );
    }

});