// Load dependencies
var EventEmitter = require("events").EventEmitter,
    assign = require("object-assign");

// Load dispatcher
var AppDispatcher = require("../appDispatcher");

// Load constants
var AuthConstants = require("../../shared/constants/auth"),
    UpdateConstants = require("../../shared/constants/update");

// Load models
var UpdateModel = require("../models/update");

// Load stores
var AuthStore = require("../../client/stores/auth");

// Constants
var CHANGE_EVENT = "change";

// Initial variables
var currentPage = 0,
    initialPageLoad = true;


// Define the Backbone collection (Initialized below)
var UpdatesCollection = Backbone.Collection.extend({

    model: UpdateModel,

    comparator: function (update1, update2) {
        return (new Date(update2.get("timestamp")) - new Date(update1.get("timestamp")));
    },

    initialize: function (options) {
        options = options || {};
        this.url = options.url || "/api/updates";
    }

});


// Create the initial collection with the bootstrapped data from the embedded script tag
var updatesCollection = new UpdatesCollection(initialUpdates);


// Define the store EventEmitter object
var UpdatesStore = assign({}, EventEmitter.prototype, {

    getAll: function () {
        return updatesCollection;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});


// Attach the event listener
updatesCollection.on("add change remove", UpdatesStore.emitChange.bind(UpdatesStore), UpdatesStore);


// Create a new update
var create = function (text, visibility) {

    var user = AuthStore.getUser();

    var update = new UpdateModel({
        timestamp: (new Date()).toISOString(),
        username: user.username,
        url: user.url,
        text: text,
        visibility: visibility
    });

    updatesCollection.add(update);
    update.save({}, {
        headers: AuthStore.constructAuthHeader()
    });

};


// Destroy an existing update
var destroy = function (id) {
    var update = updatesCollection.get(id);
    update.destroy({
        headers: AuthStore.constructAuthHeader()
    });
};


// Change URL of store (ie. Your updates, timeline, etc.)
var changeURL = function (url) {

    currentPage = 0;
    updatesCollection.url = url;

    if (initialPageLoad) {
        updatesCollection.set(initialUpdates);
        initialPageLoad = false;
    } else {
        updatesCollection.set([]);
        sync();
    }

};


// Sync to the server
var sync = function () {

    currentPage = 0;

    updatesCollection.fetch({
        headers: AuthStore.constructAuthHeader()
    });

};

// Go to next page
var page = function () {

    currentPage++;

    updatesCollection.fetch({
        headers: AuthStore.constructAuthHeader(),
        add: true,
        remove: false,
        merge: false,
        data: {
            page: currentPage
        }
    });

};


// Watch the auth store for changes to resync
AuthStore.addEventListener(AuthConstants.Events.SIGN_IN_SUCCESS_EVENT, sync);
AuthStore.addEventListener(AuthConstants.Events.SIGN_OUT_EVENT, sync);


// Exports
module.exports = UpdatesStore;


// Register with the dispatcher to handle actions
AppDispatcher.register(function (action) {

    switch (action.actionType) {

        case UpdateConstants.Actions.UPDATE_CREATE:

            create(action.text, action.visibility);
            UpdatesStore.emitChange();
            break;

        case UpdateConstants.Actions.UPDATE_DESTROY:

            destroy(action.id);
            UpdatesStore.emitChange();
            break;

        case UpdateConstants.Actions.CHANGE_URL:

            changeURL(action.url);
            break;

        case UpdateConstants.Actions.SYNC:

            sync();
            break;

        case UpdateConstants.Actions.PAGE:

            page();
            break;

        default:
        // Do nothing

    }

});