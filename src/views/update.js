module.exports = function (data) {

    var update = {
        "id": data.update.id,
        "text": data.update.text,
        "timestamp": data.update.timestamp
    };

    return JSON.stringify(update);

};