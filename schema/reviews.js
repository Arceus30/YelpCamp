const Joi = require("joi");

const reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().min(1).required(),
        rating: Joi.number().min(0).required(),
    }).required(),
});

module.exports = reviewSchema;
