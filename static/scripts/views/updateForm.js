var Rewind = Rewind || {};

Rewind.Views = Rewind.Views || {};

(function () {

    Rewind.Views.UpdateForm = React.createClass({

        handleSubmit: function (e) {

            e.preventDefault();
            var text = React.findDOMNode(this.refs.text).value.trim();

            if (!text) {
                return;
            }

            this.props.onUpdateSubmit(text);
            React.findDOMNode(this.refs.text).value = "";

        },

        render: function () {
            return (
                <form className="update_form" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="What's on your mind?" ref="text"/>
                    <input type="submit" value="Post"/>
                </form>
            );
        }

    });

})();