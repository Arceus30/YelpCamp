const { registerSchema, loginSchema } = require("../schema");
const ExpressError = require("../utility/ExpressError");

const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        req.flash("error", msg);
        req.flash("formData", {
            username: req.body.username,
            email: req.body.email,
        });
        return res.redirect("/register");
    }
    next();
};
const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        req.flash("error", msg);
        req.flash("formData", {
            username: req.body.username,
            email: req.body.email,
        });
        return res.redirect("/login");
    }
    next();
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
