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
}

module.exports = new ConfigurationController();