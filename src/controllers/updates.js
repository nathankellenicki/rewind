"use strict";

// Export interface
module.exports = function () {

    // Load models
    var UpdateModel = require("../models").update;

    return {

        getRecentUpdates: function (startPoint) {
            return new Promise(function (resolve, reject) {

                UpdateModel.findAll({
                    order: "timestamp DESC"
                }).then(function (updates) {
                    resolve(updates);
                });

            });
        },

        createUpdate: function (text) {
            return new Promise(function (resolve, reject) {

                UpdateModel.create({
                    text: text,
                    timestamp: new Date()
                }).then(function (updates) {
                    resolve(updates);
                });

            });
        }

    };

}