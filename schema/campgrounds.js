const Joi = require("joi");

const campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().min(1).required(),
        price: Joi.number().min(0).required(),
        location: Joi.string().min(1).required(),
        description: Joi.string().min(1).required(),
        // image: Joi.string().min(1).required(),
    }).required(),
    deleteImages: Joi.array(),
});

module.exports = campgroundSchema;
