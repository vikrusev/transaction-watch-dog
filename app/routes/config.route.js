const configHandlers = require('../handlers/configuration.handler')
const validateDto = require('../middlewares/validate-dtos.middleware')
const updateCurrentConfigurationList = require('../middlewares/update-configuration-list.middleware')
const configDtos = require('../dtos/config')

/**
 * All Configuration endpoints
 * 
 * When an endpoint which alters the active Configurtions is called
 * the preHandler for updating the Current Active Configuration List
 * should be added
 * @param {*} fastify
 * @param {*} options
 */
async function config(fastify, options) {
    // Get all available Configurations
    fastify.get('/', configHandlers.getAllConfigurations)

    // Get a single Configuration, given its id
    fastify.get(
        '/:id',
        { preHandler: validateDto(configDtos.identifyConfigById) },
        configHandlers.getConfigurationById
    )

    // Create a Configuration, given its rules data
    fastify.post(
        '/',
        {
            schema: {
                body: configDtos.createConfig
            },
            preHandler: updateCurrentConfigurationList
        },
        configHandlers.createConfiguration
    )

    // Update a whole Configuration
    fastify.put(
        '/',
        {
            schema: {
                body: configDtos.updateConfig
            },
            preHandler: updateCurrentConfigurationList
        },
        configHandlers.updateOrCreateWholeConfiguration
    )

    // Update partially a Configuration
    fastify.patch(
        '/',
        {
            schema: {
                body: configDtos.updateConfig
            },
            preHandler: updateCurrentConfigurationList
        },
        configHandlers.patchConfiguration
    )

    // Delete a Configuration
    fastify.delete(
        '/:id',
        { 
            preHandler: [
                validateDto(configDtos.identifyConfigById),
                updateCurrentConfigurationList
            ]
        },
        configHandlers.deleteConfiguration
    )
}

module.exports = config
