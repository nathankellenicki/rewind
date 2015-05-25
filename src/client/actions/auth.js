// Load actions
var AppDispatcher = require("../appDispatcher");

// Load constants
var AuthConstants = require("../../shared/constants/auth");


// Exports
var AuthActions = module.exports = {

    signIn: function (email, password) {
        AppDispatcher.dispatch({
            actionType: AuthConstants.Actions.SIGN_IN_ACTION,
            email: email,
            password: password
        });
    },

    signOut: function (email, password) {
        AppDispatcher.dispatch({
            actionType: AuthConstants.Actions.SIGN_OUT_ACTION
        });
    }

};

