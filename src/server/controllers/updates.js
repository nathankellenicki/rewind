"use strict";

// Export interface
module.exports = function () {

    // Load models
    var UpdateModel = require("../models").update,
        KnownUser = require("../models").knownUser;

    // Create associations
    UpdateModel.belongsTo(KnownUser, {
        foreignKey: "knownUserId"
    });

    return {

        getRecentUpdates: function (startPoint) {

            startPoint = startPoint || 0;

            return new Promise(function (resolve, reject) {

                UpdateModel.findAll({
                    order: "timestamp DESC",
                    include: [KnownUser]
                }).then(function (updates) {
                    resolve(updates);
                });

            });

        },

        getUpdate: function (id) {

            return new Promise(function (resolve, reject) {

                UpdateModel.findOne({
                    where: {
                        id: id
                    }
                }).then(function (update) {
                    resolve(update);
                });

            });

        },

        createUpdate: function (userId, text) {

            return new Promise(function (resolve, reject) {

                var update = {
                    knownUserId: userId,
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