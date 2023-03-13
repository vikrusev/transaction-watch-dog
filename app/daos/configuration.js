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
                include: [[sequelize.literal('(SELECT MAX("versionNumber") FROM "ConfigurationVersions" WHERE "configId" = "Configuration"."id")'), 'latestVersionNumber']],
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
    async getLatestConfigurationVersionNumber(configId) {
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
     * Get the latest Version of a Configuration
     * @param {*} configId - the id of the Configuration to find the latest Version
     * @param {*} id 
     * @returns the latest Version of the Configuration
     */
    async getLatestConfigurationVersion(configId) {
        const latestConfigurationVersion = await ConfigurationVersion.findOne({
            order: [['versionNumber', 'DESC']],
            attributes: {
                exclude: ['id', 'configId', 'createdAt']
            },
            where: {
                configId
            },
            raw: true
        });

        if (!latestConfigurationVersion) {
            throw new NotFoundException(`No latest version for Configuration w/ id #${configId} was found`);
        }

        return latestConfigurationVersion;
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
    async getFullConfigurationById(configurationId) {
        const configuration = await Configuration.findByPk(configurationId, {
            attributes: {
                exclude: ['deletedAt']
            },
            raw: true
        });
        const latestConfigurationVersion = await this.getLatestConfigurationVersion(configurationId);

        // Check if a Configuration entry exists
        if (!configuration) {
            throw new NotFoundException(`Configuration w/ id #${configurationId} could not be found.`);
        }

        return {
            ...configuration,
            ...latestConfigurationVersion
        }
    }

    /**
     * Creates a new Configuration entry in the DB
     * Adds a record in the Configurations and ConfigurationVersions tables
     * @param {*} data - data of the new Configuration
     * @returns 
     */
    async create({ id: configurationId, ...newData }) {
        return await sequelize.transaction(async t => {
            const newConfiguration = await Configuration.create({
                active: newData.active
            });
            await ConfigurationVersion.create({
                ...newData,
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
    async updateWhole({ id: configurationId, ...newData }) {
        // Get current latest version of the Configuration
        const latestVersion = await this.getLatestConfigurationVersionNumber(configurationId);

        return await sequelize.transaction(async t => {
            // update the Configuration
            await Configuration.update({
                active: newData.active,
            }, {
                where: {
                    id: configurationId
                }
            });

            // create a new Version of the Configuration
            const { createdAt, versionNumber } = await ConfigurationVersion.create({
                ...newData,
                configId: configurationId,
                versionNumber: 1 + latestVersion,
            });

            return {
                versionNumber,
                updatedAt: createdAt
            }
        })
    }

    /**
     * Patches a Configuration
     * Updates Configuration
     * 
     * Creates a new Version of the Configuration, preserving the old rules
     * And patches the given ones
     * @param {*} configuration - newly incoming Configuration data 
     */
    async patchConfiguration({ id: configurationId, ...newData }) {
        // get current data from DB
        const { id, createdAt, ...currentData } = await this.getFullConfigurationById(configurationId);

        return await sequelize.transaction(async t => {
            // update the Configuration
            await Configuration.update({
                active: newData.active ?? currentData.active,
            }, {
                where: {
                    id: configurationId
                }
            });

            // create a new Version of the Configuration
            const { createdAt, versionNumber } = await ConfigurationVersion.create({
                ...currentData,
                ...newData,
                configId: configurationId,
                versionNumber: 1 + currentData.versionNumber,
            });

            return {
                versionNumber,
                updatedAt: createdAt
            }
        })
    }

    /**
     * Deletes a Configuration
     * Configuration schema uses Paranoid strategy, so the record will be soft deleted
     * This means that it will have a deletedAt property and will not be considered in queries
     * @param {*} configurationId 
     */
    async deleteConfiguration(configurationId) {
        return await Configuration.destroy({
            where: {
                id: configurationId
            }
        });
    }
}

module.exports = ConfigurationDao;