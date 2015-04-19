var Rewind = Rewind || {};

Rewind.Models = Rewind.Models || {};
Rewind.Collections = Rewind.Collections || {};

Rewind.Models.Update = require("../models/update");

module.exports = Rewind.Collections.Updates = Backbone.Collection.extend({

    model: Rewind.Models.Update,

    comparator: function (update1, update2) {
        return (new Date(update2.get("timestamp")) - new Date(update1.get("timestamp")));
    },

    initialize: function (options) {
        this.url = options.url || "/api/updates";
    }

});

