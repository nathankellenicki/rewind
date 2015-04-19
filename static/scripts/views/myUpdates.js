var Rewind = Rewind || {};

Rewind.Models = Rewind.Models || {};
Rewind.Models.Update = require("../models/update");

Rewind.Collections = Rewind.Collections || {};
Rewind.Collections.Updates = require("../collections/updates");

Rewind.Views = Rewind.Views || {};
Rewind.Views.UpdateForm = require("../views/updateForm");
Rewind.Views.UpdatesList = require("../views/updatesList");

Rewind.Utils = Rewind.Utils || {};
Rewind.Utils.BackboneMixin = require("../utils/backboneMixin");

var fetchInterval = 10000;

module.exports = Rewind.Views.MyUpdates = React.createClass({

    mixins: [Rewind.Utils.BackboneMixin],

    getBackboneModels: function () {
        return [this.state.updates];
    },

    handleUpdateSubmit: function (text) {

        var update = new Rewind.Models.Update({
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

        var updatesCollection = new Rewind.Collections.Updates({
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
                <Rewind.Views.UpdateForm onUpdateSubmit={this.handleUpdateSubmit} />
                <Rewind.Views.UpdatesList onDelete={this.handleDelete} updates={this.state.updates} />
            </div>
        );
    }

});