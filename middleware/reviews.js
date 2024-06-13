const { reviewSchema } = require("../schema");
const ExpressError = require("../utility/ExpressError");
const { Review } = require("../models");

const validateReview = (req, res, next) => {
    try {
        const { error } = reviewSchema.validate(req.body);
        if (error) {
            const msg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400, msg);
        }
        next();
    } catch (e) {
        next(e);
    }
};

const isReviewAuthor = async (req, res, next) => {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash(
            "error",
            "You are not the author, You don't have permission to do so"
        );
        return res.redirect(`campgrounds/${id}`);
    }
    next();
};

module.exports = {
    validateReview,
    isReviewAuthor,
};
