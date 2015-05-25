var keyMirror = require("keymirror");

// Exports
module.exports = {
    Actions: keyMirror({
        SIGN_IN_ACTION: null,
        SIGN_OUT_ACTION: null
    }),
    Events: keyMirror({
        SIGN_IN_SUCCESS_EVENT: null,
        SIGN_IN_FAILED_EVENT: null,
        SIGN_OUT_EVENT: null
    })
};