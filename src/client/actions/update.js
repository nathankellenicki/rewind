// Load actions
var AppDispatcher = require("../appDispatcher");

// Load constants
var UpdateConstants = require("../../shared/constants/update");


// Exports
var UpdateActions = module.exports = {

  create: function (text) {
      AppDispatcher.dispatch({
          actionType: UpdateConstants.Actions.UPDATE_CREATE,
          text: text
      });
  },

  destroy: function (id) {
      AppDispatcher.dispatch({
          actionType: UpdateConstants.Actions.UPDATE_DESTROY,
          id: id
      });
  },

  changeURL: function (url) {
      AppDispatcher.dispatch({
          actionType: UpdateConstants.Actions.CHANGE_URL,
          url: url
      });
  },

  sync: function () {
      AppDispatcher.dispatch({
          actionType: UpdateConstants.Actions.SYNC
      });
  }

};

