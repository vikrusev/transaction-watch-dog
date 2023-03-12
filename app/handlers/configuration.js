const { NotFoundException } = require('../errors/api-error');
const ConfigurationDao = require('../daos/configuration');

class ConfigurationController {
    constructor() {
        this.configurationDao = new ConfigurationDao();

        this.getAllConfigurations = this.getAllConfigurations.bind(this);
        this.getConfigurationById = this.getConfigurationById.bind(this);
        this.createConfiguration = this.createConfiguration.bind(this);
        this.updateOrCreateWholeConfiguration = this.updateOrCreateWholeConfiguration.bind(this);
        this.patchConfiguration = this.patchConfiguration.bind(this);
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
        return await this.configurationDao.getFullConfigurationById(params.id);
    }

    /**
     * Creates a Configuration in the DB
     * Sets HTTP status code to 201 if the operation is successful
     * @param {*} param0 - incoming data of the configuration object
     * @param {*} reply 
     * @returns - the id from the DB of the newly created Configuration row
     */
    async createConfiguration({ body: configurationData }, reply) {
        const newId = await this.configurationDao.create(configurationData)
        reply.statusCode = 201;

        return { newId }
    }

    /**
     * Update a Configuration in the DB
     * It can be partial update or complete update
     * Both update and create will CREATE a new entry
     * This is because we DO want to preserve the Configuration rule versions
     * @param {*} param0 - incoming data of a Configuration
     * @param {*} reply 
     * @returns - the id from the DB of the newly created Configuration row
     */
    async updateOrCreateWholeConfiguration({ body: configurationData }, reply) {
        // In case of an error, the statusCode will be set accordingly by the api-error-handler
        reply.statusCode = 201;

        try {
            // Will throw NotFoundException if the resource does not exist in the DB
            await this.configurationDao.getFullConfigurationById(configurationData.id);
        }
        catch(error) {
            // Resourse was not found in the DB
            // Create a new one
            if (error instanceof NotFoundException) {
                return this.createConfiguration({ body: configurationData }, reply)
            }

            // Otherwise, propagate the error up
            throw error;
        }

        // The resourse exists - update it
        // NOTE: The method CREATES a new record because of Configuration rule versioning
        return await this.configurationDao.updateWhole(configurationData);
    }

    /**
     * Patches a Configuration
     * Preserve all data and just update properties specified in the incoming data
     * @param {*} param0 - incoming new data for a Configuration
     * @param {*} reply 
     */
    async patchConfiguration({ body: configurationData }, reply) {
        // In case of an error, the statusCode will be set accordingly by the api-error-handler
        reply.statusCode = 201;

        return await this.configurationDao.patchConfiguration(configurationData);
    }
}

module.exports = new ConfigurationController();