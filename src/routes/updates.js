"use strict";

// Include dependencies
var express = require("express");

// Load controllers
var UpdatesController = require("../controllers/updates.js"),
    updatesController = new UpdatesController();

// Setup routes
var router = module.exports = express.Router();

router.get("/", function (req, res, next) {

    var startPoint = 0;

    updatesController.getRecentUpdates(startPoint).then(function (updates) {
        res.status(200).send({
            status: 200,
            updates: updates
        });
        return next;
    }).catch(function (err) {
        res.status(500).send(err);
        return next;
    });

});

router.post("/", function (req, res, next) {

    var text = req.body["text"];

    updatesController.createUpdate(text).then(function () {
        res.status(200).send({
            status: 200
        });
        return next;
    }).catch(function (err) {
        res.status(500).send(err);
        return next;
    });

    res.status(200).send({});
    return next;
});