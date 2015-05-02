"use strict";

// Include dependencies
var express = require("express");

// Load controllers
var AuthenticationController = require("../../controllers/authentication"),
    authenticationController = new AuthenticationController();

// Setup routes
var router = module.exports = express.Router();

router.post("/", function (req, res, next) {

    var email = req.body["email"],
        password = req.body["password"];

    authenticationController.login(email, password).then(function (user) {

        /*res.status(200).send(updateView({
            update: update
        }));*/
        res.status(200).send(user);
        return next;

    }).catch(function (err) {

        res.status(500).send(err);
        return next;

    });

});

router.post("/register", function (req, res, next) {

    var email = req.body["email"],
        password = req.body["password"],
        username = req.body["username"];

    authenticationController.register(email, password, username).then(function (user) {

        /*res.status(200).send(updateView({
         update: update
         }));*/
        res.status(200).send(user);
        return next;

    }).catch(function (err) {

        res.status(500).send(err);
        return next;

    });

});