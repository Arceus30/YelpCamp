const { campgroundSchema } = require("../schema");
const ExpressError = require("../utility/ExpressError");
const { Campground } = require("../models");

const validateCampground = (req, res, next) => {
    try {
        const { error } = campgroundSchema.validate(req.body);
        if (error) {
            const msg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400, msg);
        }
        return next();
    } catch (e) {
        return next(e);
    }
};

const isCampgroundAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(res.locals.currentUser._id)) {
        req.flash(
            "error",
            "You are not the author, You don't have permission to do so"
        );
        return res.redirect(`/campgrounds/${id}`);
    }
    return next();
};
module.exports = {
    validateCampground,
    isCampgroundAuthor,
};
