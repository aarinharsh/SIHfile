const jwt = require("jsonwebtoken");

function requireLogin(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        res.clearCookie("token");
        return res.redirect("/login");
    }
}

function requireRole(...roles) {

    return (req, res, next) => {

        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).send("Access denied");
        }

        next();
    };
}

module.exports = {
    requireLogin,
    requireRole
};