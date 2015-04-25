"use strict";

// Include app and initialize models
var app = require("./src/server/app"),
    models = require("./src/server/models");

// Load config
var config = require("./src/server/utils/config");

// Config
app.set("port", config.port);

// Start listening
models.sequelize.sync().then(function () {
    var server = app.listen(app.get("port"));
    console.log("Rewind listening on port " + server.address().port);
});