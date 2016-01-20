"use strict";

// Intercept .jsx files to compile JSX with Babel
require("babel-core/register")({
    extensions: [".jsx"],
    presets: ["react"]
});

// Include dependencies
var React = require("react"),
    express = require("express");

// Load React components (As factories)
var YourUpdatesComponent = React.createFactory(require("../../shared/components/yourUpdates.jsx")),
    HeaderComponent = React.createFactory(require("../../shared/components/header.jsx"));

// Load controllers
var UpdatesController = require("../controllers/updates"),
    updatesController = new UpdatesController();

// Load views
var updatesView = require("../views/updatesBackboneCollectionMock"),
    cleanUpdatesView = require("../views/updates");

// Setup routes
var router = module.exports = express.Router();

router.get("/", function (req, res, next) {

    var startPoint = 0;

    updatesController.getRecentUpdates(startPoint).then(function (updates) {

        var initialUpdates = cleanUpdatesView({
            updates: updates
        });

        var renderedHeaderMarkup = React.renderToString(HeaderComponent()),
            renderedUpdateMarkup = React.renderToString(YourUpdatesComponent({
            url: "/api/updates",
            serverRenderedUpdates: updatesView({
                updates: updates
            })
        }));

        res.status(200).render("index", {
            initialUpdates: JSON.stringify(initialUpdates),
            serverRenderedHeaderComponent: renderedHeaderMarkup,
            serverRenderedYourUpdatesComponent: renderedUpdateMarkup
        });

        return next;

    }).catch(function (err) {

        console.log(err);

        res.status(500).send(err);
        return next;

    });

});

router.use("/static", express.static("static")); // Static files