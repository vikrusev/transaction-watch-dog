const Joi = require('joi')
const createConfigDto = require('./create-config.dto')

module.exports = createConfigDto.keys({
    id: Joi.number().integer().min(1).required()
})
