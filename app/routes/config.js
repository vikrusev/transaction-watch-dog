const configController = require('../controllers/configuration')

/**
 * All Configuration endpoints
 * @param {*} fastify 
 * @param {*} options 
 */
async function config(fastify, options) {
    fastify.get('/', configController.getAllConfigurations);
}

module.exports = config;
