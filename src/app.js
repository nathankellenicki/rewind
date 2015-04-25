"use strict";

// Include dependencies
require("log-timestamp"); // STDOUT timestamping

var express = require("express"), // HTTP routing
    exphbs  = require('express-handlebars'), // Express Handlebars rendering
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

app.engine("handlebars", exphbs({
    defaultLayout: "index",
    layoutsDir: __dirname + "/templates"
}));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/templates");


// Setup routes
app.use("/api/updates", require("./routes/api/updates.js")); // My updates
app.use("/", require("./routes/site.js")); // Site HTML and static files


// Export interface
module.exports = app;

