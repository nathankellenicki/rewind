// Load dependencies
var fs = require("fs");

var Config = module.exports = (function () {

    var configFile = process.env.CONFIG_FILE || "config.dev.json",
        config = JSON.parse(fs.readFileSync("./config/" + configFile));

    config.port = process.env.PORT || config.port || 8080;

    config.db = config.db || {};
    config.db.hostname = process.env.DB_HOSTNAME || config.db.hostname || "localhost";
    config.db.port = process.env.DB_PORT || config.db.port || 3306;
    config.db.database = process.env.DB_DATABASE || config.db.database || "rewind";
    config.db.username = process.env.DB_USERNAME || config.db.username;
    config.db.password = process.env.DB_PASSWORD || config.db.password;

    config.heroku = config.heroku || {};

    console.log("Loaded " + configFile);

    return config;

})();