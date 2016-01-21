"use strict";

// Load constants
var UpdateConstants = require("../../shared/constants/update");

var PAGE_SIZE = 20,
    MAX_CHARS = 140;

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

        getRecentUpdates: function (pageNumber, types) {

            pageNumber = pageNumber || 0;

            return new Promise(function (resolve, reject) {

                UpdateModel.findAll({
                    order: "timestamp DESC",
                    where: {
                        visibility: types || [UpdateConstants.Permissions.PUBLIC]
                    },
                    limit: PAGE_SIZE,
                    offset: (pageNumber * PAGE_SIZE),
                    include: [KnownUser]
                }).then(function (updates) {
                    resolve(updates);
                });

            });

        },

        getUpdatesByUserName: function (userName, pageNumber, types) {

            pageNumber = pageNumber || 0;

            return new Promise(function (resolve, reject) {

                UpdateModel.findAll({
                    order: "timestamp DESC",
                    where: {
                        visibility: types || [UpdateConstants.Permissions.PUBLIC],
                    },
                    limit: PAGE_SIZE,
                    offset: (pageNumber * PAGE_SIZE),
                    include: [{
                        model: KnownUser,
                        where: {
                            username: userName
                        }
                    }]
                }).then(function (updates) {
                    resolve(updates);
                }).catch(function (err) {
                    reject(err);
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
                }).catch(function (err) {
                    reject(err);
                });

            });

        },

        createUpdate: function (userId, text, visibility) {

            return new Promise(function (resolve, reject) {

                var update = {
                    knownUserId: userId,
                    text: text.substr(0, MAX_CHARS),
                    visibility: visibility,
                    timestamp: new Date()
                };

                UpdateModel.create(update).then(function (result) {
                    resolve(result);
                }).catch(function (err) {
                    reject(err);
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
                }).catch(function (err) {
                    reject(err);
                });

            });

        }

    };

};