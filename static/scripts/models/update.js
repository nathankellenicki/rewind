// Exports
var UpdateModel = module.exports = Backbone.Model.extend({

    defaults: {
        "timestamp": null,
        "text": null
    },

    urlRoot: "/api/updates"

});