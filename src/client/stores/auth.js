// Load dependencies
var EventEmitter = require("events").EventEmitter,
    assign = require("object-assign"),
    jwt = require("jsonwebtoken");

// Load dispatcher
var AppDispatcher = require("../appDispatcher");

// Load constants
var AuthConstants = require("../../shared/constants/auth");


// Store
var store = {
    token: null,
    user: null
};


// Define the store EventEmitter object
var AuthStore = assign({}, EventEmitter.prototype, {

    isSignedIn: function () {
        return !!store.user;
    },

    getUser: function () {
        return store.user;
    },

    constructAuthHeader: function () {
        if (store.token) {
            return {
                "X-Rewind-Auth": store.token
            };
        } else {
            return {};
        }
    },

    emitEvent: function (event) {
        this.emit(event);
    },

    addEventListener: function (event, callback) {
        this.on(event, callback);
    },

    removeEventListener: function (event, callback) {
        this.removeListener(event, callback);
    }

});


// Sign in
var signIn = function (email, password) {

    $.ajax({
        method: "POST",
        url: "/api/auth/signin",
        contentType: "application/json",
        data: JSON.stringify({
            email: email,
            password: password
        })
    }).done(function (data) {

        var decoded = jwt.decode(data.jwt);

        store.token = data.jwt;
        store.user = {
            username: decoded.username,
            email: decoded.email,
            url: decoded.url
        };

        AuthStore.emitEvent(AuthConstants.Events.SIGN_IN_SUCCESS_EVENT);

    }).fail(function (err) {
        AuthStore.emitEvent(AuthConstants.Events.SIGN_IN_FAILED_EVENT);
    })

};


// Sign Out
var signOut = function () {
    store.token = null;
    store.user = null;
    AuthStore.emitEvent(AuthConstants.Events.SIGN_OUT_EVENT);
};


// Exports
module.exports = AuthStore;


// Register with the dispatcher to handle actions
AppDispatcher.register(function (action) {

    switch (action.actionType) {

        case AuthConstants.Actions.SIGN_IN_ACTION:

            signIn(action.email, action.password);
            break;

        case AuthConstants.Actions.SIGN_OUT_ACTION:

            signOut();
            break;

        default:
        // Do nothing

    }

});