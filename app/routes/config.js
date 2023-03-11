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
        '/:id',
        { preHandler: validateDto(configDtos.getConfigById) },
        configController.getConfigurationById
    )
}

module.exports = config
