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
        try {
            request.log.info('Getting all available configurations...')
            return { hello: 'worldd' }
        }
        catch(err) {

        }
    }
}

module.exports = new ConfigurationController();