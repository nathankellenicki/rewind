module.exports = function (data) {

    var updates = data.updates.map(function (update) { return {
        "id": update.id,
        "text": update.text,
        "username": update.knownUser.username,
        "url": update.knownUser.url,
        "timestamp": update.timestamp
    }});

    return updates;

};