// Include subtemplates
var http200View = require("./http_200");

module.exports = function (data) {

    var base = JSON.parse(http200View());

    base.updates = data.updates.map(update => ({
        "id": update.id,
        "text": update.text,
        "timestamp": update.timestamp
    }));

    return JSON.stringify(base);

}