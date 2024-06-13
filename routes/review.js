const express = require("express");
const router = express.Router({ mergeParams: true });
const { reviewsController } = require("../controller");
const { reviewsMiddleware, usersMiddleware } = require("../middleware");

router
    .route("/reviews/")
    .post(
        usersMiddleware.isLoggedIn,
        reviewsMiddleware.validateReview,
        reviewsController.createNewReview
    );

router
    .route("/reviews/:reviewId")
    .delete(
        usersMiddleware.isLoggedIn,
        reviewsMiddleware.isReviewAuthor,
        reviewsController.deleteReview
    );

module.exports = router;
