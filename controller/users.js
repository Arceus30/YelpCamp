const { User } = require("../models");

const renderRegister = (req, res, next) => {
    res.render("users/register");
};

const register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to YelpCamp");
            return res.redirect("/campgrounds");
        });
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/register");
    }
};

const renderLogin = (req, res, next) => {
    res.render("users/login");
};

const login = (req, res) => {
    req.flash("success", "Welcome Back");
    const redirectUrl = res.locals.returnTo || "/campgrounds";
    delete res.locals.returnTo;
    res.redirect(redirectUrl);
};

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            req.flash("error", "Logout Failed");
            return next(err);
        }
        req.flash("success", "Logout Successfully");
        return res.redirect("/");
    });
};

module.exports = {
    renderRegister,
    register,
    renderLogin,
    login,
    logout,
};