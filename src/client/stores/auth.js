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


// Given a JWT, check if it's expired (But don't verify!)
var isJWTExpired = function (token) {

    var completeDecoded = jwt.decode(token, {
        complete: true
    });

    return (completeDecoded.payload.exp <= +((new Date()) / 1000));

};


// Given a JWT, extract the user details
var extractUserDetailsFromJWT = function (token) {

    var decoded = jwt.decode(token);

    return {
        username: decoded.username,
        email: decoded.email,
        url: decoded.url
    }

};


// Initialize the store based on a stored token
var initialize = function () {

    var token = localStorage.getItem("rewind::auth-token");

    if (token) {

        if (!isJWTExpired(token)) {

            store.token = token;
            store.user = extractUserDetailsFromJWT(token);

        } else {
            localStorage.removeItem("rewind::auth-token");
        }
    }

};


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
        store.user = extractUserDetailsFromJWT(data.jwt);

        localStorage.setItem("rewind::auth-token", data.jwt);
        AuthStore.emitEvent(AuthConstants.Events.SIGN_IN_SUCCESS_EVENT);

    }).fail(function (err) {
        AuthStore.emitEvent(AuthConstants.Events.SIGN_IN_FAILED_EVENT);
    })

};


// Sign Out
var signOut = function () {

    store.token = null;
    store.user = null;

    localStorage.removeItem("rewind::auth-token");
    AuthStore.emitEvent(AuthConstants.Events.SIGN_OUT_EVENT);

};


// Initialize the store from localStorage
initialize();


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