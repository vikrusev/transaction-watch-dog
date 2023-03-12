const configHandlers = require('../handlers/configuration')
const validateDto = require('../middlewares/validate-dtos')
const configDtos = require('../dtos/config')

/**
 * All Configuration endpoints
 * @param {*} fastify
 * @param {*} options
 */
async function config(fastify, options) {
    fastify.get('/', configHandlers.getAllConfigurations)

    fastify.get(
        '/:id',
        { preHandler: validateDto(configDtos.getConfigById) },
        configHandlers.getConfigurationById
    )
}

module.exports = config
