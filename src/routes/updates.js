"use strict";

// A hacky, very temporary, data store
var updates = [
    {
        "timestamp": 1231,
        "text": "This is an update."
    },
    {
        "timestamp": 3214,
        "text": "This is *another* update."
    }
];

// Include dependencies
var express = require("express");

// Setup routes
var router = express.Router();

router.get("/", function (req, res, next) {

    res.send({
        "updates": updates
    });

    return next;

});

router.post("/", function (req, res, next) {

    updates = [{
        "timestamp": Math.floor(+(new Date()) / 1000),
        "text": req.body["text"]
    }].concat(updates);

    res.status(200).send({});

    return next;

});

module.exports = router;