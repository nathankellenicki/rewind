"use strict";

// Export interface
module.exports = function (sequelize, DataTypes) {

    // Create the model
    var LocalUser = sequelize.define("localUser", {
        knownUserId: {
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        salt: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    });

    return LocalUser;

}