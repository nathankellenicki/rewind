"use strict";

// Load dependencies
var crypto = require("crypto");

// Load config
var config = require("../utils/config");

// Export interface
module.exports = function () {

    // Load models
    var KnownUser = require("../models").knownUser,
        LocalUser = require("../models").localUser;


    var createSalt = function () {

        var rand = Math.random() * 1000,
            date = +(new Date());

        return crypto.createHash("sha512").update(rand + "" + date).digest("hex").substr(0, 128);

    };

    var secureHash = function (salt, password) {

        var i = 0,
            hash = password;

        while (i < 1000) {
            hash = crypto.createHash("sha512").update(config.initial_salt + hash + salt + i).digest("hex");
            i++;
        }

        return hash.substr(0, 128);

    };

    return {

        login: function (email, password) {

            return new Promise(function (resolve, reject) {

                LocalUser.findOne({
                    where: {
                        email: email
                    }
                }).then(function (user) {

                    console.log(user);

                    var hash = secureHash(user.salt, password);

                    if (user.password == hash) {
                        resolve(user);
                    } else {
                        reject(true);
                    }

                }).catch(function (err) {
                    console.log("ok");
                    console.log(err);
                });

            });

        },

        register: function (email, password, username) {

            return new Promise(function (resolve, reject) {

                var salt = createSalt(),
                    hash = secureHash(salt, password),
                    url = config.url + username;

                var knownUser = {
                    username: username,
                    url: url
                };

                KnownUser.create(knownUser).then(function (result) {

                    var localUser = {
                        knownUserId: result.id,
                        email: email,
                        salt: salt,
                        password: hash
                    };

                    return LocalUser.create(localUser);

                }).then(function (result) {
                    resolve(result);
                });

            });

        }

    };

};