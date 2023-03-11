const fastify = require('fastify');
const router = require('./routes');

class Server {
    constructor() {
        this.fastify = fastify({ logger: true })
        this.setup();
    }

    /**
     * Register the main router consisting of all fastify routes
     * Register apiErrorHandler 
     */
    setup() {
        this.fastify.register(router);
        // this.fastify.register(apiErrorHandler);
    }

    /**
     * Start the server
     * @param {number | string} port - on which port to start the server
     */
    async start(port) {
        try {
            await this.fastify.listen({ port })
            this.fastify.log.info(`Server running on port ${port}`)
        } catch (err) {
            this.fastify.log.error(`Failed to start the server on port ${port}. Error: ${err}`)
            process.exit(-1)
        }
    }

    /**
     * Stop the server
     * The server will respond w/ a HTTP 503 error for any new incoming requests and destroy them.
     */
    async stop() {
        try {
            await this.fastify.close()
            this.fastify.log.info('Server successfully stopped!')
        }
        catch(err) {
            this.fastify.log.error(`Failed to stop the server. Error: ${err}`)
        }
    }
}

module.exports = Server;