var Rewind = Rewind || {};

Rewind.Views = Rewind.Views || {};

(function () {

    var checkUpdateFormat = function (update) {

        var requiredFields = ["id", "timestamp", "text"];

        for (var i = 0; i < requiredFields.length; i++) {
            if (!update.get(requiredFields[i])) {
                return false;
            }
        }

        return true;

    };

    var ULContainerTransitionGroup = React.addons.TransitionGroup;

    Rewind.Views.UpdatesList = React.createClass({
        render: function () {

            var updateNodes = [];

            for (var i = 0; i < this.props.updates.length; i++) {
                var update = this.props.updates.at(i);
                if (checkUpdateFormat(update)) {
                    updateNodes.push(
                        <Rewind.Views.Update onDelete={this.props.onDelete} key={update.get("id")} id={update.get("id")} timestamp={update.get("timestamp")}>{update.get("text")}</Rewind.Views.Update>
                    );
                }
            }

            return (
                <ULContainerTransitionGroup component="ul" className="updates_list">
                    {updateNodes}
                </ULContainerTransitionGroup>
            );

        }
    });

})();