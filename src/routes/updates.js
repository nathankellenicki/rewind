"use strict";

// Include dependencies
var express = require("express");

// Load controllers
var UpdatesController = require("../controllers/updates"),
    updatesController = new UpdatesController();

// Load views
var http200View = require("../views/http_200"),
    updatesView = require("../views/updates");

// Setup routes
var router = module.exports = express.Router();

router.get("/", function (req, res, next) {

    var startPoint = 0;

    updatesController.getRecentUpdates(startPoint).then(function (updates) {

        res.status(200).contentType("application/json").send(updatesView({
            updates: updates
        }));
        return next;

    }).catch(function (err) {

        res.status(500).send(err);
        return next;

    });

});

router.post("/", function (req, res, next) {

    var text = req.body["text"];

    updatesController.createUpdate(text).then(function () {

        res.status(200).contentType("application/json").send(http200View());
        return next;

    }).catch(function (err) {

        res.status(500).send(err);
        return next;

    });

});