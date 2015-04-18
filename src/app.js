"use strict";

// Include dependencies
require("log-timestamp"); // STDOUT timestamping

var express = require("express"), // HTTP routing
    bodyParser = require("body-parser"), // For JSON body parsing
    morgan = require("morgan"), // Apache compatible access logging
    fs = require("fs"); // Filesystem access

// Config
var port = process.env.PORT || 8080;

// Setup the server
var app = express(),
    accessLogStream = fs.createWriteStream(__dirname + "/../access.log", {flags: "a"});

app.use(morgan("combined", {stream: accessLogStream}));
app.use(bodyParser.json());

// Setup routes
app.use("/api/updates", require("./routes/updates.js")); // My updates
app.use("/", express.static("static")); // Static files

// Export interface
module.exports = app;

