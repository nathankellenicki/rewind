"use strict";

// Include app and initialize models
var app = require("./src/server/app"),
    models = require("./src/server/models");

// Config
app.set("port", process.env.PORT || 8080);

// Start listening
models.sequelize.sync().then(function () {
    var server = app.listen(app.get("port"));
    console.log("Rewind listening on port " + server.address().port);
});