"use strict";

// Export interface
module.exports = function (sequelize, DataTypes) {

    // Create the model
    var KnownUser = sequelize.define('knownUser', {
        username: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING,
            unique: true
        }
    });

    return KnownUser;

}