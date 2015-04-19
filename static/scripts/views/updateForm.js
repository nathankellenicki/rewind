var Rewind = Rewind || {};

Rewind.Views = Rewind.Views || {};

module.exports = Rewind.Views.UpdateForm = React.createClass({

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