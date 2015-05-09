"use strict";

// Include dependencies
var express = require("express");

// Load controllers
var AuthController = require("../../controllers/auth"),
    authController = new AuthController();

// Load views
var jwtView = require("../../views/jwt");

// Setup routes
var router = module.exports = express.Router();

router.post("/signin", function (req, res, next) {

    var email = req.body["email"],
        password = req.body["password"];

    authController.signin(email, password).then(function (jwt) {

        /*res.status(200).send(updateView({
            update: update
        }));*/
        res.status(200).send(jwtView({
            jwt: jwt
        }));
        return next;

    }).catch(function (err) {

        console.log(err);

        res.status(500).send(err);
        return next;

    });

});

router.post("/register", function (req, res, next) {

    var email = req.body["email"],
        password = req.body["password"],
        username = req.body["username"];

    authController.register(email, password, username).then(function (user) {

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