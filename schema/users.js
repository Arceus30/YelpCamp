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
