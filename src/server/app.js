"use strict";

// Include dependencies
require("log-timestamp"); // STDOUT timestamping

var express = require("express"), // HTTP routing
    jwt = require("express-jwt"), // JWT Express middleware
    exphbs  = require('express-handlebars'), // Express Handlebars rendering
    bodyParser = require("body-parser"), // For JSON body parsing
    morgan = require("morgan"), // Apache compatible access logging
    fs = require("fs"); // Filesystem access

// Load config
var config = require("./utils/config");

// Setup the server
var app = express(),
    accessLogStream = fs.createWriteStream(config.access_log, {flags: "a"});

app.use(morgan("combined", {stream: accessLogStream}));
app.use(bodyParser.json());


// Create the JWT middleware for parsing JWT tokens
app.use(jwt({
    secret: config.jwt_salt,
    credentialsRequired: false,
    requestProperty: "auth",

    getToken: function (req) {

        if (req.headers["X-Rewind-Auth".toLowerCase()]) {
            return req.headers["X-Rewind-Auth".toLowerCase()];
        } else {
            return null;
        }

    }

}));


// Load handlebars middleware
app.engine("handlebars", exphbs({
    defaultLayout: "index",
    layoutsDir: __dirname + "/templates"
}));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/templates");


// Setup routes
app.use("/api/auth", require("./routes/api/auth.js")); // Authentication routes
app.use("/api/updates", require("./routes/api/updates.js")); // My updates
app.use("/", require("./routes/site.js")); // Site HTML and static files


// Export interface
module.exports = app;

