const campgroundSchema = require("./campgrounds");
const reviewSchema = require("./reviews");
const { registerSchema, loginSchema } = require("./users");

module.exports = {
    campgroundSchema,
    reviewSchema,
    registerSchema,
    loginSchema,
};
