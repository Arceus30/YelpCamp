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

const registerSchema = Joi.object({
    username: Joi.string().min(1).required().escapeHTML(),
    email: Joi.string().min(1).required().escapeHTML(),
    password: Joi.string().min(1).required().escapeHTML(),
});
const loginSchema = Joi.object({
    username: Joi.string().min(1).required().escapeHTML(),
    password: Joi.string().min(1).required().escapeHTML(),
});

module.exports = { registerSchema, loginSchema };
