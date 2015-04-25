"use strict";

// Intercept .jsx files to compile JSX
require("node-jsx").install({extension: ".jsx"});

// Include dependencies
var React = require("react"),
    express = require("express");

// Load React components (As factories)
var YourUpdatesComponent = React.createFactory(require("../../static/scripts/components/yourUpdates.jsx"));

// Load controllers
var UpdatesController = require("../controllers/updates"),
    updatesController = new UpdatesController();

// Load views
var updatesView = require("../views/updatesBackboneCollectionMock");

// Setup routes
var router = module.exports = express.Router();

router.get("/", function (req, res, next) {

    var startPoint = 0;

    updatesController.getRecentUpdates(startPoint).then(function (updates) {

        var renderedMarkup = React.renderToString(YourUpdatesComponent({
            url: "/api/updates",
            serverRenderedUpdates: updatesView({
                updates: updates
            })
        }));

        res.status(200).render("index", {
            serverRenderedReactComponent: renderedMarkup
        });
        return next;

    }).catch(function (err) {

        res.status(500).send(err);
        return next;

    });

});

router.use("/static", express.static("static")); // Static files