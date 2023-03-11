const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string()
            .trim()
            .min(1)
            .alphanum()
            .required()
});