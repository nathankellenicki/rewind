var authMiddleWare = module.exports = function () {

    return function (req, res, next) {

        if (!req.auth || !req.auth.username || !req.auth.email || !req.auth.url) {
            res.status(401).send("UnauthorizedError");
        } else {
            next();
        }

    }

};