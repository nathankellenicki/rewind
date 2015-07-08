"use strict";

// Load constants
var UpdateConstants = require("../../shared/constants/update");

// Export interface
module.exports = function (sequelize, DataTypes) {

    // Create the model
    var Update = sequelize.define('update', {
        knownUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING(140)
        },
        visibility: {
            type: DataTypes.INTEGER,
            defaultValue: UpdateConstants.Permissions.PUBLIC,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    return Update;

}