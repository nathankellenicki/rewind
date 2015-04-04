"use strict";

// Include dependencies
var express = require("express");

// Setup routes
var router = express.Router();

router.get("/", function (req, res) {
    res.send({});
});

module.exports = router;