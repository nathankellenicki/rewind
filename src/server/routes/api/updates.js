"use strict";

// Include dependencies
var express = require("express");

// Load controllers
var UpdatesController = require("../../controllers/updates"),
    updatesController = new UpdatesController();

var UserController = require("../../controllers/user"),
    userController = new UserController();

// Load views
var updateView = require("../../views/update"),
    updatesView = require("../../views/updates");

// Load constants
var UpdateConstants = require("../../../shared/constants/update");

// Load middleware
var authMiddleware = require("../../middleware/auth");

// Setup routes
var router = module.exports = express.Router();

router.get("/", function (req, res, next) {

    var startPoint = 0,
        perms = [UpdateConstants.Permissions.PUBLIC];

    if (req.auth && req.auth.perms) {
        perms = req.auth.perms;
    }

    updatesController.getRecentUpdates(startPoint, perms).then(function (updates) {

        res.status(200).send(updatesView({
            updates: updates
        }));
        return next;

    }).catch(function (err) {

        res.status(500).send(err);
        return next;

    });

});

router.post("/", authMiddleware(), function (req, res, next) {

    var text = req.body["text"],
        visibility = req.body["visibility"];

    userController.getUserByEmail(req.auth.email).then(function (user) {

        return updatesController.createUpdate(user.id, text, visibility);

    }).then(function (update) {

        res.status(200).send(updateView({
            update: update
        }));
        return next;

    }).catch(function (err) {

        res.status(500).send(err);
        return next;

    });

});

router.delete("/:id", authMiddleware(), function (req, res, next) {

    var id = req.params["id"];

    userController.getUserByEmail(req.auth.email).then(function (user) {

        return new Promise(function (resolve, reject) {

            updatesController.getUpdate(id).then(function (update) {
                resolve([update, user]);
            }).catch(function (err) {
                reject(err);
            })

        });

    }).then(function (updateUserTuple) {

        var update = updateUserTuple[0],
            user = updateUserTuple[1];

        if (update.knownUserId == user.id) {
            return updatesController.deleteUpdateBy(id);
        } else {
            res.status(401).send("UnauthorizedError");
            return next;
        }

    }).then(function () {

        res.status(200).send({});
        return next;

    }).catch(function (err) {

        res.status(500).send(err);
        return next;

    });

});