var keyMirror = require("keymirror");

// Exports
module.exports = {
    Actions: keyMirror({
        UPDATE_CREATE: null,
        UPDATE_DESTROY: null,
        CHANGE_URL: null,
        SYNC: null
    }),
    Permissions: {
        PUBLIC: 0,
        PRIVATE: 1,
        FRIENDS: 2
    }
};