const { InvalidFormatException } = require('../errors/api-error.class');
const configRouter = require('./config.route');

/**
 * Register all available 
 * @param {*} fastify 
 * @param {*} options 
 */
async function registerRoutes(fastify, options) {
    fastify.setValidatorCompiler(({ schema }) => {
        return data => {
            const result = schema.validate(data)
            if (result.error) {
                throw new InvalidFormatException(result.error.message)
            }
            return { value: result.value };
        }
    })
    // Custom Error Handler is not reached for some reason
    // fastify.setErrorHandler((error, request, reply) => {
    //     if (errors.validation) {
    //         reply.status(422).send(new Error('validation failed'))
    //     }
    // })
    fastify.register(configRouter, { prefix: '/config' });
}

module.exports = registerRoutes;