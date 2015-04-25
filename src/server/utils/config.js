// Load dependencies
var fs = require("fs");

var Config = module.exports = (function () {

    var configFile = process.env.CONFIG_FILE || "config.dev.json",
        config = JSON.parse(fs.readFileSync("./config/" + configFile));

    config.port = process.env.PORT || config.port || 8080;

    config.db.hostname = process.env.DB_HOSTNAME || config.db.hostname || "localhost";
    config.db.username = process.env.DB_USERNAME || config.db.username;
    config.db.password = process.env.DB_PASSWORD || config.db.password;

    return config;

})();