const express = require("express");
const router = express.Router();
const { campgroundsController } = require("../controller");
const { campgroundsMiddleware, usersMiddleware } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
    .route("/")
    .get(campgroundsController.index)
    .post(
        usersMiddleware.isLoggedIn,
        upload.array("images"),
        campgroundsMiddleware.validateCampground,
        campgroundsController.createNewCampground
    );

router.route("/new").get(
    // usersMiddleware.isLoggedIn,
    campgroundsController.renderNew
);

router
    .route("/:id")
    .get(campgroundsController.showCampground)
    .put(
        usersMiddleware.isLoggedIn,
        campgroundsMiddleware.isCampgroundAuthor,
        upload.array("images"),
        campgroundsMiddleware.validateCampground,
        campgroundsController.editCampground
    )
    .delete(
        usersMiddleware.isLoggedIn,
        campgroundsMiddleware.isCampgroundAuthor,
        campgroundsController.deleteCampground
    );

router
    .route("/:id/edit")
    .get(
        usersMiddleware.isLoggedIn,
        campgroundsMiddleware.isCampgroundAuthor,
        campgroundsController.renderEdit
    );
module.exports = router;
