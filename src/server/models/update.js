"use strict";

// Export interface
module.exports = function (sequelize, DataTypes) {

    // Create the model
    var Update = sequelize.define('update', {
        knownUserId: {
            type: DataTypes.INTEGER
        },
        text: {
            type: DataTypes.STRING
        },
        timestamp: {
            type: DataTypes.DATE
        }
    });

    return Update;

}