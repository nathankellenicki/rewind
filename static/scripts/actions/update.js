// Load actions
var AppDispatcher = require("../appDispatcher");

// Load constants
var UpdateConstants = require("../constants/update");


// Exports
module.exports = UpdateActions = {

  create: function (text) {
      AppDispatcher.dispatch({
          actionType: UpdateConstants.UPDATE_CREATE,
          text: text
      });
  },

  destroy: function (id) {
      AppDispatcher.dispatch({
          actionType: UpdateConstants.UPDATE_DESTROY,
          id: id
      });
  },

  changeURL: function (url) {
      AppDispatcher.dispatch({
          actionType: UpdateConstants.CHANGE_URL,
          url: url
      });
  },

  sync: function () {
      AppDispatcher.dispatch({
          actionType: UpdateConstants.SYNC
      });
  }

};

