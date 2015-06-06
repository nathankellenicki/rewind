var keyMirror = require("keymirror");

// Exports
module.exports = {
    Types: keyMirror({
        OPTION_LOCATION: null,
        OPTION_IMAGES: null,
        OPTION_BLOG: null,
        OPTION_VISIBILITY: null,
        VISIBILITY_PUBLIC: null,
        VISIBILITY_FRIENDS: null,
        VISIBILITY_PRIVATE: null,
        LOCATION_FETCHING: null,
        LOCATION_DISCOVERING: null,
        LOCATION_FOUND: null,
        LOCATION_ERROR: null
    })
};