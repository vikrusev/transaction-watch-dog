const fastify = require('fastify')({ logger: true });

class Server {
    constructor() {
        // the instance should be inside the class
        // this.registerRoutes();

        router.get('/', async (request, reply) => {
            return { hello: 'world' }
        })
    }

    registerRoutes() {
        // register available routes
    }

    /**
     * Start the server
     * @param {number | string} port - on which port to start the server
     */
    async start(port) {
        try {
            await fastify.listen({ port })

            fastify.log.info(`Server running on port ${port}`)
        } catch (err) {
            fastify.log.error(`Failed to start the server on port ${port}. Error: ${err}`)
            process.exit(-1)
        }
    }

    /**
     * Stop the server
     * The server will respond w/ a HTTP 503 error for any new incoming requests and destroy them.
     */
    async stop() {
        try {
            await fastify.close()
            fastify.log.info('Server successfully stopped!')
        }
        catch(err) {
            fastify.log.error(`Failed to stop the server. Error: ${err}`)
        }
    }
}

module.exports = Server;