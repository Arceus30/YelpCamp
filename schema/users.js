const Joi = require("joi");

// Regular expression for password validation
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;

const registerSchema = Joi.object({
    username: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(1).pattern(passwordRegex).required().messages({
        "string.pattern.base":
            "Password must be between 8 to 20 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    }),
});
const loginSchema = Joi.object({
    username: Joi.string().min(1).required(),
    password: Joi.string().min(1).pattern(passwordRegex).required().messages({
        "string.pattern.base":
            "Password must be between 8 to 20 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    }),
});

module.exports = { registerSchema, loginSchema };
