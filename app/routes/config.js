const configController = require('../controllers/configuration')
const validateDto = require('../middlewares/validate-dtos')
const configDtos = require('../dtos/config')

/**
 * All Configuration endpoints
 * @param {*} fastify
 * @param {*} options
 */
async function config(fastify, options) {
    fastify.get('/', configController.getAllConfigurations)

    fastify.get(
        '/id/:id',
        { preHandler: validateDto(configDtos.getConfigById) },
        configController.getConfigurationById
    )

    fastify.get(
        '/name/:name',
        { preHandler: validateDto(configDtos.getConfigByName) },
        configController.getConfigurationByName
    )
}

module.exports = config
