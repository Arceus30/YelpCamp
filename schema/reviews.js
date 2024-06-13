const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

// Define a custom extension for Joi
const extension = {
    type: "string",
    base: Joi.string(),
    messages: {
        "string.escapeHTML": "{{#label}} must not include HTML!",
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const sanitizedValue = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (sanitizedValue !== value) {
                    return helpers.error("string.escapeHTML", { value });
                }
                return sanitizedValue;
            },
        },
    },
};

// Create a Joi instance with the custom extension
const Joi = BaseJoi.extend(extension);

const reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().min(1).required().escapeHTML(),
        rating: Joi.number().min(0).required().max(5),
    }).required(),
});

module.exports = reviewSchema;
