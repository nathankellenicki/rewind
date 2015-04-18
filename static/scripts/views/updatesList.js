var Rewind = Rewind || {};

Rewind.Views = Rewind.Views || {};

(function () {

    Rewind.Views.UpdatesList = React.createClass({
        render: function () {

            var updateNodes = this.props.updates.map(function (update) {
                return (
                    <Rewind.Views.Update key={update.get("id")} timestamp={update.get("timestamp")}>{update.get("text")}</Rewind.Views.Update>
                );
            });

            return (
                <div className="updates">
                    <ul className="updates_list">
                        {updateNodes}
                    </ul>
                </div>
            );

        }
    });

})();