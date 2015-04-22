// Load actions
var UpdateActions = require("../actions/update");


// Exports
module.exports = UpdateFormComponent = React.createClass({

    handleSubmit: function (e) {

        e.preventDefault();
        var text = React.findDOMNode(this.refs.text).value.trim();

        if (!text) {
            return;
        }

        UpdateActions.create(text);
        React.findDOMNode(this.refs.text).value = "";

    },

    render: function () {
        return (
            <form className="update_form" onSubmit={this.handleSubmit}>
                <textarea placeholder="What's on your mind?" ref="text"></textarea>
                <div className="options">
                    <button className="location">Add Location</button>
                    <button className="image">Add Image</button>
                    <button className="blog">Add Blog</button>
                    <input type="submit" value="Post" />
                </div>
            </form>
        );
    }

});


