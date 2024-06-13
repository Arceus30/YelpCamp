const express = require("express");
const router = express.Router();
const passport = require("passport");
const { usersController } = require("../controller");
const { usersMiddleware } = require("../middleware");

router
    .route("/register")
    .get(usersMiddleware.isLoggedInUser, usersController.renderRegister)
    .post(usersMiddleware.validateRegister, usersController.register);

router
    .route("/login")
    .get(usersMiddleware.isLoggedInUser, usersController.renderLogin)
    .post(
        usersMiddleware.validateLogin,
        usersMiddleware.storeReturnTo,
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
        }),
        usersController.login
    );

router.route("/logout").get(usersController.logout);

module.exports = router;
