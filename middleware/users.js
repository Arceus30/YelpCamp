const { registerSchema, loginSchema } = require("../schema");
const ExpressError = require("../utility/ExpressError");

const validateRegister = (req, res, next) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            const msg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400, msg);
        }
        next();
    } catch (e) {
        next(e);
    }
};
const validateLogin = (req, res, next) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            const msg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400, msg);
        }
        next();
    } catch (e) {
        next(e);
    }
};

const isLoggedIn = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must Sign in first");
        return res.redirect("/login");
    }
    next();
};

const isLoggedInUser = async (req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash("error", "You are already logged in");
        return res.redirect("/campgrounds");
    }
    next();
};

const storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    isLoggedIn,
    isLoggedInUser,
    storeReturnTo,
};
