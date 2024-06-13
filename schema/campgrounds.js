const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
        "string.escapeHTML": "{{#label}} must not include HTML!",
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value)
                    return helpers.error("string.escapeHTML", { value });
                return clean;
            },
        },
    },
});

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
