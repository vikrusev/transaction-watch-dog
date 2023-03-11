class ConfigurationController {
    constructor() {
        // this.getAllConfigurations = this.getAllConfigurations.bind(this);
    }

    /**
     * Get all available Configurations
     * @param {*} request 
     * @param {*} reply 
     * @returns 
     */
    async getAllConfigurations(request, reply) {
        request.log.info('Getting all available configurations...')
        return { hello: 'world' }
    }

    /**
     * Get Configuration by id
     * @param {*} request 
     * @param {*} reply 
     * @returns 
     */
    async getConfigurationById({ params }, reply) {
        request.log.info(`Getting configuration w/ id #${params.id}...`)
        return { hello: 'world' }
    }

    /**
     * Get Configuration by name
     * @param {*} request 
     * @param {*} reply 
     * @returns 
     */
    async getConfigurationByName({ params }, reply) {
        request.log.info(`Getting configuration w/ name ${params.name}...`)
        return { hello: 'world' }
    }
}

module.exports = new ConfigurationController();