const Joi = require('joi');
const createConfigDto = require('./create-config');

module.exports = createConfigDto.keys({
    id: Joi.number().integer().min(0).required()
})
