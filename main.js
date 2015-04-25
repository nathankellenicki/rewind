"use strict";

// Include app and initialize models
var app = require("./src/server/app"),
    Models = require("./src/server/models");

// Load utils
var Heroku = require("./src/server/utils/heroku");

// Load config
var config = require("./src/server/utils/config");

// Config
app.set("port", config.port);

// Heroku keep-alive
if (config.heroku["keep-alive"]) {
    Heroku.createKeepAlive(config.url);
}

// Start listening
Models.sequelize.sync().then(function () {
    var server = app.listen(app.get("port"));
    console.log("Rewind listening on port " + server.address().port);
});