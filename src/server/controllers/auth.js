"use strict";

// Load dependencies
var crypto = require("crypto"),
    jwt = require("jsonwebtoken");

// Load controllers
var UserController = require("./user"),
    userController = new UserController();

// Load constants
var UpdateConstants = require("../../shared/constants/update");

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

    var rootPermissions = function () {
        return [
            UpdateConstants.Permissions.PUBLIC,
            UpdateConstants.Permissions.PRIVATE,
            UpdateConstants.Permissions.FRIENDS
        ];
    };

    var createJWT = function (username, email, url, permissions) {

        return jwt.sign({
            "username": username,
            "email": email,
            "url": url,
            "perms": permissions
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

                userController.getUserByEmail(email).then(function (user) {

                    var hash = secureHash(user.salt, password);

                    if (user.password == hash) {
                        resolve(createJWT(user.username, user.email, user.url, rootPermissions()));
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
                    hash = secureHash(salt, password);

                userController.createUser(email, username, salt, hash).then(function (user) {
                    resolve(createJWT(username, email, user.url, rootPermissions()));
                }).catch(function (err) {
                    reject(err);
                });

            });

        }

    };

};