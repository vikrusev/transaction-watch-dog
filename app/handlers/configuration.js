const ConfigurationDao = require('../daos/configuration');

class ConfigurationController {
    constructor() {
        this.configurationDao = new ConfigurationDao();

        this.getAllConfigurations = this.getAllConfigurations.bind(this);
        this.getConfigurationById = this.getConfigurationById.bind(this);
        this.createConfiguration = this.createConfiguration.bind(this);
    }

    /**
     * Get all available Configurations and their rules
     * @param {*} request 
     * @param {*} reply 
     * @returns 
     */
    async getAllConfigurations(request, reply) {
        return await this.configurationDao.getAll()
    }

    /**
     * Get Configuration by id
     * @param {*} request 
     * @param {*} reply 
     * @returns 
     */
    async getConfigurationById({ params }, reply) {
        return await this.configurationDao.getOneById(params.id);
    }

    /**
     * Creates a Configuration in the DB
     * @param {*} param0 - incoming data of the configuration object
     * @param {*} reply 
     * @returns - the id from the DB of the newly created Configuration row
     */
    async createConfiguration({ body: configurationData }, reply) {
        const newId = await this.configurationDao.create(configurationData)
        reply.statusCode = 201;

        return { newId }
    }
}

module.exports = new ConfigurationController();