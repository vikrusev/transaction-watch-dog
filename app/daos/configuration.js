const { NotFoundException } = require('../errors/api-error');
const { Configuration, ConfigurationVersion } = require('../models');
const sequelize = require('../db');

/**
 * DAO for a Configuration
 */
class ConfigurationDao {
    constructor() {
        this.configurationLeftJoinRules = {
            attributes: {
                include: [[sequelize.fn('max', sequelize.col('versionNumber')), 'latestVersionNumber']],
                exclude: ['deletedAt']
            },
            include: {
                model: ConfigurationVersion,
                as: 'ConfigurationRules',
                attributes: {
                    exclude: ['id', 'configId']
                },
                required: false
            },
            raw: true,
            group: ['Configuration.id', 'ConfigurationRules.id']
        };
    }

    /**
     * Get the latest version of a specific Configuration
     * @param {*} configId - the configuration id of which we want to get the latest version
     * @returns {number} - the latest version of a Configuration
     * @throws {NotFoundException} - if no version of the Configuration is found
     */
    async getLatestConfigurationVersion(configId) {
        const latestVersion = ConfigurationVersion.max('versionNumber', {
            where: {
                configId
            },
            raw: true
        })

        // The version is minimum 1
        if (!latestVersion) {
            throw new NotFoundException(`No version for Configuration w/ id #${configuration.id} was found`);
        }

        return latestVersion;
    }

    /**
     * Gets all Configurations and performs LEFT JOIN to get their versionised rules
     * Excludes deletedAt and ids from the ConfigurationVersions table
     * @returns all Configurations
     */
    async getAll() {
        return await Configuration.findAll(this.configurationLeftJoinRules);
    }

    /**
     * Gets a single Configurations given the primary key
     * And performs LEFT JOIN to get the versionised rules
     * Excludes deletedAt and ids from the ConfigurationVersions table
     * @returns a single Configuration
     * @throws {NotFoundException} - if the Configuration is not found
     */
    async getOneById(configurationId) {
        const configuration = await Configuration.findByPk(configurationId, this.configurationLeftJoinRules);

        // Check if a Configuration entry exists
        if (!configuration) {
            throw new NotFoundException(`Configuration w/ id #${configurationId} could not be found.`);
        }

        return configuration;
    }

    /**
     * Creates a new Configuration entry in the DB
     * Adds a record in the Configurations and ConfigurationVersions tables
     * @param {*} data - data of the new Configuration
     * @returns 
     */
    async create(data) {
        return await sequelize.transaction(async t => {
            const newConfiguration = await Configuration.create({
                active: data.active
            });
            await ConfigurationVersion.create({
                ...data,
                versionNumber: 1,
                configId: newConfiguration.id
            });

            return newConfiguration.id;
        })
    }

    /**
     * Updates a whole Configuration entry in the DB
     * Gets the last Version of the Configurations
     * 
     * Updates the active Configuration active status
     * And creates the next Configuration Version
     * @param {*} data - new data of the Configuration
     * @returns 
     */
    async updateWhole(configuration) {
        // Get current latest version of the Configuration
        const latestVersion = await this.getLatestConfigurationVersion(configuration.id);

        return await sequelize.transaction(async t => {
            // do not include an id property to the creation as it is picked and used
            const configurationId = configuration.id;
            delete configuration.id

            await Configuration.update({
                active: configuration.active,
            }, {
                where: {
                    id: configurationId
                }
            });

            const { createdAt, versionNumber } = await ConfigurationVersion.create({
                ...configuration,
                configId: configurationId,
                versionNumber: 1 + latestVersion,
            });

            return {
                versionNumber,
                updatedAt: createdAt
            }
        })
    }
}

module.exports = ConfigurationDao;