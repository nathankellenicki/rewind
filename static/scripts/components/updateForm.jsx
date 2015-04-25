// Load dependencies
var React = require("react/addons");

// Load actions
var UpdateActions = require("../actions/update");

// Load constants
var UpdateFormConstants = require("../constants/updateForm");

// Load React components
var UpdateFormLocationOption = require("./updateFormLocationOption.jsx");

// This maps the below classNames to option constants
var optionTypeMapping = {
    "location": UpdateFormConstants.OPTION_LOCATION,
    "image": UpdateFormConstants.OPTION_IMAGES,
    "blog": UpdateFormConstants.OPTION_BLOG
};

// Setup vars
var TransitionGroupContainer = React.addons.CSSTransitionGroup;


// Exports
var UpdateFormComponent = module.exports = React.createClass({

    _viewState: {
        options: []
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
        var text = React.findDOMNode(this.refs.text).value.trim();

        if (!text) {
            return;
        }

        UpdateActions.create(text);
        React.findDOMNode(this.refs.text).value = "";

    },

    handleOptionToggle: function (e) {
        e.preventDefault();
        this._toggleUpdateOption(optionTypeMapping[e.target.className]);
    },

    getInitialState: function () {
        return this._viewState;
    },

    render: function () {

        var optionViews = [];

        if (this._isOptionSet(UpdateFormConstants.OPTION_LOCATION)) {
            optionViews.push(
                <UpdateFormLocationOption key={"location"} />
            );
        }

        return (
            <form className="update_form" onSubmit={this.handleSubmit}>
                <textarea placeholder="What's on your mind?" ref="text"></textarea>
                <TransitionGroupContainer className="option_container" transitionName="sliding">
                    {optionViews}
                </TransitionGroupContainer>
                <div className="options">
                    <button className="location" onClick={this.handleOptionToggle}>Add Location</button>
                    <button className="image" onClick={this.handleOptionToggle}>Add Image</button>
                    <button className="blog" onClick={this.handleOptionToggle}>Add Blog</button>
                    <input type="submit" value="Post" />
                </div>
            </form>
        );
    }

});


