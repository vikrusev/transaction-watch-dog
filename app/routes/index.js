const configRouter = require('./config');

/**
 * Register all available 
 * @param {*} fastify 
 * @param {*} options 
 */
async function registerRoutes(fastify, options) {
    fastify.register(configRouter, { prefix: '/config' });
}

module.exports = registerRoutes;