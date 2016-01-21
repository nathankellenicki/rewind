"use strict";

// Load config
var config = require("../utils/config");


// Export interface
var UserController = module.exports = function () {

    // Load models
    var KnownUser = require("../models").knownUser,
        LocalUser = require("../models").localUser;

    // Create associations
    LocalUser.belongsTo(KnownUser, {
        foreignKey: "knownUserId",
        as: "KnownUser"
    });

    return {

        getUserByEmail: function (email) {

            return new Promise(function (resolve, reject) {

                LocalUser.findOne({
                    where: {
                        email: email
                    },
                    include: [KnownUser]
                }).then(function (user) {

                    resolve({
                        id: user.knownUser.id,
                        username: user.knownUser.username,
                        email: user.email,
                        url: user.knownUser.url,
                        salt: user.salt,
                        password: user.password
                    });

                }).catch(function (err) {
                    reject(err);
                });

            });

        },

        createUser: function (email, username, salt, password) {

            return new Promise(function (resolve, reject) {

                var knownUser = {
                    username: username,
                    url: config.url + username
                };

                KnownUser.create(knownUser).then(function (knownUserResult) {

                    var localUser = {
                        knownUserId: knownUserResult.id,
                        email: email,
                        salt: salt,
                        password: password
                    };

                    return new Promise(function (resolve, reject) {

                        LocalUser.create(localUser).then(function (localUserResult) {
                            resolve([knownUserResult, localUserResult]);
                        }).catch(function (err) {
                            reject(err);
                        })

                    });

                }).then(function (userTuple) {

                    var knownUser = userTuple[0],
                        localUser = userTuple[1];

                    resolve({
                        id: knownUser.id,
                        username: knownUser.username,
                        email: localUser.email,
                        url: knownUser.url,
                        salt: localUser.salt,
                        password: localUser.password
                    });

                }).catch(function (err) {
                    reject(err);
                });

            });

        }

    };

};