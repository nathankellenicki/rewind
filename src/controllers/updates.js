"use strict";

// Export interface
module.exports = function () {

    // Load models
    var UpdateModel = require("../models").update;

    return {

        getRecentUpdates: function (startPoint = 0) {
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

                var update = {
                    text: text,
                    timestamp: new Date()
                };

                UpdateModel.create(update).then(function (result) {
                    resolve(result);
                });

            });
        },

        deleteUpdateBy: function (id) {

            return new Promise(function (resolve, reject) {

                UpdateModel.destroy({
                    where: {
                        "id": id
                    }
                }).then(function () {
                    resolve();
                });

            });

        }

    };

};