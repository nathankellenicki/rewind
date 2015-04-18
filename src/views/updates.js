module.exports = function (data) {

    var updates = data.updates.map(update => ({
        "id": update.id,
        "text": update.text,
        "timestamp": update.timestamp
    }));

    return JSON.stringify(updates);

};