"use strict";

// Export interface
module.exports = function (sequelize, DataTypes) {

    // Create the model
    var Update = sequelize.define('update', {
        text: {
            type: DataTypes.STRING
        },
        timestamp: {
            type: DataTypes.DATE
        }
    });

    return Update;

}