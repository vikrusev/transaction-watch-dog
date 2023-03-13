const Joi = require('joi')
const {
    stringNumber,
    hexHash,
    hexHash32Bytes
} = require('../../common/regexes')

module.exports = Joi.object({
    active: Joi.boolean(),
    generalizedMathFormula: Joi.string(), // TODO: should be a math formula regex
    hash: Joi.string().pattern(hexHash32Bytes),
    blockNumber: Joi.number().integer().min(0).allow(null),
    from: Joi.string().pattern(hexHash),
    to: Joi.string().pattern(hexHash).allow(null),
    value: Joi.string().pattern(stringNumber),
    gas: Joi.number().min(0),
    gasPrice: Joi.string().pattern(stringNumber),
    nonce: Joi.number().min(0)
})
