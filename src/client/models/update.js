// Exports
var UpdateModel = module.exports = Backbone.Model.extend({

    defaults: {
        "timestamp": null,
        "username": null,
        "url": null,
        "text": null
    },

    urlRoot: "/api/updates"

});