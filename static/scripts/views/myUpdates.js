var Rewind = Rewind || {};

Rewind.Views = Rewind.Views || {};

(function () {

    var fetchInterval = 10000;

    Rewind.Views.MyUpdates = React.createClass({

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
                    <Rewind.Views.UpdatesList updates={this.state.updates} />
                </div>
            );
        }

    });

})();