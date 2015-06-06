// Load dependencies
var React = require("react/addons");

// Load actions
var UpdateActions = require("../../client/actions/update");

// Load constants
var UpdateFormConstants = require("../constants/updateForm"),
    UpdateContants = require("../constants/update");

// Load React components
var UpdateFormLocationOption = require("./updateFormLocationOption.jsx"),
    UpdateFormVisibilityPopup = require("./updateFormVisibilityPopup.jsx");

// This maps the below classNames to option constants
var optionTypeMapping = {
    "location": UpdateFormConstants.Types.OPTION_LOCATION,
    "image": UpdateFormConstants.Types.OPTION_IMAGES,
    "blog": UpdateFormConstants.Types.OPTION_BLOG,
    "visibility": UpdateFormConstants.Types.OPTION_VISIBILITY
};

var visibilityTypeMapping = {
    "public": UpdateContants.Permissions.PUBLIC,
    "friends": UpdateContants.Permissions.FRIENDS,
    "private": UpdateContants.Permissions.PRIVATE
};


// Exports
var UpdateFormComponent = module.exports = React.createClass({

    _viewState: {
        options: [],
        visibility: UpdateContants.Permissions.PUBLIC
    },

    _toggleUpdateOption: function (option) {

        var itemIndex = this._viewState.options.indexOf(option);

        if (itemIndex >= 0) {
            this._viewState.options.splice(itemIndex, 1);
        } else {
            this._viewState.options.push(option);
        }

        this.setState(this._viewState);

    },

    _isOptionSet: function (option) {
      if (this.state.options.indexOf(option) >= 0) {
          return true;
      } else {
          return false;
      }
    },

    handleSubmit: function (e) {

        e.preventDefault();
        var text = React.findDOMNode(this.refs.text).value.trim(),
            visibility = this.state.visibility;

        if (!text) {
            return;
        }

        UpdateActions.create(text, visibility);

        // Reset everything
        React.findDOMNode(this.refs.text).value = "";
        this._viewState.visibility = UpdateContants.Permissions.PUBLIC;
        this._viewState.options = [];
        this.setState(this._viewState);

    },

    handleOptionToggle: function (e) {
        e.preventDefault();
        this._toggleUpdateOption(optionTypeMapping[e.target.className]);
    },

    setVisibility: function (e) {
        e.preventDefault();
        this._viewState.visibility = visibilityTypeMapping[e.target.parentNode.className];
        this.setState(this._viewState);
        this._toggleUpdateOption(UpdateFormConstants.Types.OPTION_VISIBILITY);
    },

    getInitialState: function () {
        return this._viewState;
    },

    render: function () {

        var optionViews = [],
            popupViews = [];

        if (this._isOptionSet(UpdateFormConstants.Types.OPTION_LOCATION)) {
            optionViews.push(
                <UpdateFormLocationOption key="location" />
            );
        }

        if (this._isOptionSet(UpdateFormConstants.Types.OPTION_VISIBILITY)) {
            popupViews.push(
                <UpdateFormVisibilityPopup setVisibility={this.setVisibility} />
            );
        }

        return (
            <form className="update_form" onSubmit={this.handleSubmit}>
                <textarea placeholder="What's on your mind?" ref="text"></textarea>
                {optionViews}
                <div className="options">
                    {popupViews}
                    <button className="visibility" onClick={this.handleOptionToggle}>Visibility Settings</button>
                    <button className="location" onClick={this.handleOptionToggle}>Add Location</button>
                    <button className="image" onClick={this.handleOptionToggle}>Add Image</button>
                    <button className="blog" onClick={this.handleOptionToggle}>Add Blog</button>
                    <input type="submit" value="Post" />
                </div>
            </form>
        );
    }

});


