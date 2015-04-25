"use strict";

// Include dependencies
var fs = require("fs"),
    path = require("path"),
    Sequelize = require("sequelize");

// Load config
var config = require("../utils/config");

// Setup the database
var sequelize = new Sequelize(config.db.hostname, config.db.username, config.db.password, {
    dialect: config.db.engine,
    storage: config.db.file
});

var db = {};

// Load all the models
fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(function (file) {

    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;

});

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;