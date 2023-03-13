const Joi = require('joi')

module.exports = Joi.object({
    id: Joi.number().integer().min(1).required() // initial auto-increment value in PostgreSQL is 1
})
