// Exports
module.exports = UpdateModel = Backbone.Model.extend({

    defaults: {
        "timestamp": null,
        "text": null
    },

    urlRoot: "/api/updates"

});