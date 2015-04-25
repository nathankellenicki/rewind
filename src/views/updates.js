module.exports = function (data) {

    var updates = data.updates.map(function (update) { return {
        "id": update.id,
        "text": update.text,
        "timestamp": update.timestamp
    }});

    return updates;

};