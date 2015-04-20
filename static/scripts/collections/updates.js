// Load models
var UpdateModel = require("../models/update");


// Exports
module.exports = UpdatesCollection = Backbone.Collection.extend({

    model: UpdateModel,

    comparator: function (update1, update2) {
        return (new Date(update2.get("timestamp")) - new Date(update1.get("timestamp")));
    },

    initialize: function (options) {
        this.url = options.url || "/api/updates";
    }

});

