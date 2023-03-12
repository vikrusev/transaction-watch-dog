const configHandlers = require('../handlers/configuration')
const validateDto = require('../middlewares/validate-dtos')
const configDtos = require('../dtos/config')

/**
 * All Configuration endpoints
 * @param {*} fastify
 * @param {*} options
 */
async function config(fastify, options) {
    // Get all available Configurations
    fastify.get('/', configHandlers.getAllConfigurations)

    // Get a single Configuration, given its id
    fastify.get(
        '/:id',
        { preHandler: validateDto(configDtos.getConfigById) },
        configHandlers.getConfigurationById
    )

    // Create a Configuration, given its rules data
    fastify.post(
        '/',
        {
            schema: {
                body: configDtos.createConfig
            }
        },
        configHandlers.createConfiguration
    )

    // Update a whole Configuration
    fastify.put(
        '/',
        {
            schema: {
                body: configDtos.updateConfig
            }
        },
        configHandlers.updateOrCreateWholeConfiguration
    )

    // Update partially a Configuration
    fastify.patch(
        '/',
        {
            schema: {
                body: configDtos.updateConfig
            }
        },
        configHandlers.createConfiguration // TODO
    )
}

module.exports = config
