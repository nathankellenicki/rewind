"use strict";

// Export interface
var UserController = module.exports = function () {

    // Load models
    var KnownUser = require("../models").knownUser,
        LocalUser = require("../models").localUser;

    // Create associations
    LocalUser.belongsTo(KnownUser, {
        foreignKey: "knownUserId"
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

        }

    };

};