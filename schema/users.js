const Joi = require("joi");

const registerSchema = Joi.object({
    username: Joi.string().min(1).required(),
    email: Joi.string().min(1).required(),
    password: Joi.string().min(1).required(),
});
const loginSchema = Joi.object({
    username: Joi.string().min(1).required(),
    password: Joi.string().min(1).required(),
});

module.exports = { registerSchema, loginSchema };
