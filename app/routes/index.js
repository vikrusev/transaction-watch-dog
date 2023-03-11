const configRouter = require('./config');

/**
 * Register all available 
 * @param {*} fastify 
 * @param {*} options 
 */
async function routes(fastify, options) {
    fastify.register(configRouter, { prefix: '/config' });
}

module.exports = routes;