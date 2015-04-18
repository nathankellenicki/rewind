var Rewind = Rewind || {};

Rewind.Models = Rewind.Models || {};

(function () {

    Rewind.Models.Update = Backbone.Model.extend({
        defaults: {
            "timestamp": null,
            "text": null
        },
        urlRoot: "/api/updates"
    });

})();