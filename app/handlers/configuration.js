const ConfigurationDao = require('../daos/configuration');

class ConfigurationController {
    constructor() {
        this.configurationDao = new ConfigurationDao();
        // this.getAllConfigurations = this.getAllConfigurations.bind(this);
        this.createConfiguration = this.createConfiguration.bind(this);
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

    async createConfiguration({ body: configurationData }, reply) {
        const result = await this.configurationDao.create(configurationData)
        return { newId: result }
    }
}

module.exports = new ConfigurationController();