"use strict";

// Include dependencies
var express = require("express");

// Load controllers
var UpdatesController = require("../controllers/updates"),
    updatesController = new UpdatesController();

// Load views
var updateView = require("../views/update"),
    updatesView = require("../views/updates");

// Setup routes
var router = module.exports = express.Router();

router.get("/", function (req, res, next) {

    var startPoint = 0;

    updatesController.getRecentUpdates(startPoint).then(function (updates) {

        res.status(200).send(updatesView({
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

    updatesController.createUpdate(text).then(function (update) {

        res.status(200).send(updateView({
            update: update
        }));
        return next;

    }).catch(function (err) {

        res.status(500).send(err);
        return next;

    });

});

router.delete("/:id", function (req, res, next) {

    var id = req.params["id"];

    updatesController.deleteUpdateBy(id).then(function () {

        res.status(200).send({});
        return next;

    }).catch(function (err) {

        res.status(500).send(err);
        return next;

    });

});