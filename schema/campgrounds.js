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

const campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().min(1).required().escapeHTML(),
        price: Joi.number().min(0).required(),
        location: Joi.string().min(1).required().escapeHTML(),
        description: Joi.string().min(1).required().escapeHTML(),
        // image: Joi.string().min(1).required(),
    }).required(),
    deleteImages: Joi.array(),
});

module.exports = campgroundSchema;
