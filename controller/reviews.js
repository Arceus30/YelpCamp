const { Review, Campground } = require("../models");
const ExpressError = require("../utility/ExpressError");

// create new review
const createNewReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const campground = await Campground.findById(id);
        if (!campground) {
            throw new ExpressError(400, "Campground not found");
        }
        const { review } = req.body;
        const newReview = new Review(review);
        newReview.author = res.locals.currentUser;
        campground.reviews.push(newReview);
        await Promise.all([campground.save(), newReview.save()]);
        req.flash("success", "Review submitted successfully");
        return res.redirect(`/campgrounds/${campground._id}`);
    } catch (e) {
        req.flash("error", "Review not submitted");
        return next(e);
    }
};

// delete review
const deleteReview = async (req, res, next) => {
    try {
        const { id, reviewId } = req.params;
        const campground = await Campground.findByIdAndUpdate(
            id,
            {
                $pull: { reviews: reviewId },
            },
            { new: true }
        );
        await Review.findByIdAndDelete(reviewId);
        req.flash("warn", "Review deleted successfully");
        return res.redirect(`/campgrounds/${campground._id}`);
    } catch (e) {
        req.flash("error", "Review cannot be deleted");
        return next(e);
    }
};

module.exports = {
    createNewReview,
    deleteReview,
};
