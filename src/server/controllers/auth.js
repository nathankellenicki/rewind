"use strict";

// Load dependencies
var crypto = require("crypto"),
    jwt = require("jsonwebtoken");

// Load config
var config = require("../utils/config");

// Export interface
module.exports = function () {

    // Load models
    var KnownUser = require("../models").knownUser,
        LocalUser = require("../models").localUser;

    // Create associations
    LocalUser.belongsTo(KnownUser, {
        foreignKey: "knownUserId"
    });

    var createJWT = function (username, email, url) {

        return jwt.sign({
            "username": username,
            "email": email,
            "url": url
        }, config.jwt_salt, {
            expiresInSeconds: (24 * 60 * 60) // 24 hours
        });

    };

    var createSalt = function () {

        var rand = Math.random() * 1000,
            date = +(new Date());

        return crypto.createHash("sha512").update(rand.toString() + date.toString()).digest("hex");

    };

    var secureHash = function (salt, password) {

        var i = 0,
            hash = password;

        while (i < 1000) {
            hash = crypto.createHash("sha512").update(hash + salt).digest("hex");
            i++;
        }

        return hash;

    };

    return {

        signIn: function (email, password) {

            return new Promise(function (resolve, reject) {

                LocalUser.findOne({
                    where: {
                        email: email
                    },
                    include: [KnownUser]
                }).then(function (user) {

                    var hash = secureHash(user.salt, password);

                    if (user.password == hash) {
                        resolve(createJWT(user.knownUser.username, user.email, user.knownUser.url));
                    } else {
                        reject("Incorrect username or password");
                    }

                }).catch(function (err) {
                    reject(err);
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
                    resolve(createJWT(username, email, url));
                }).catch(function (err) {
                    reject(err);
                });

            });

        }

    };

};