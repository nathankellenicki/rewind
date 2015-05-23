module.exports = function (data) {

    var rawUpdates = [];

    var rawUpdates = data.updates.map(function (update) { return {

        id: update.id,
        text: update.text,
        username: update.knownUser.username,
        url: update.knownUser.url,
        timestamp: update.timestamp,

        get: function (prop) {
            return this[prop];
        }

    }});

    return {

        length: rawUpdates.length,

        at: function (pos) {
            return rawUpdates[pos];
        }

    };

};