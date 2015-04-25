var CommonFunctions = module.exports = {

    isRunningOnServer: function () {
        if (typeof window == "undefined") {
            return true;
        } else {
            return false;
        }
    }

}