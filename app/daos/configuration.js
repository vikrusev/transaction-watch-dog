const { Configuration, ConfigurationVersion } = require('../models');
const sequelize = require('../db');

/**
 * DAO for a Configuration
 */
class ConfigurationDao {
    constructor() { }

    /**
     * Gets all Configurations and performs LEFT JOIN to get their versionised rules
     * Exclude deletedAt and ids from the ConfigurationVersions table
     * @returns all Configurations
     */
    async getAll() {
        return await Configuration.findAll({
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
        });
    }

    /**
     * Creates a new Configuration entry in the DB
     * Adds a record in the Configurations and ConfigurationVersions tables
     * @param {*} data - 
     * @returns 
     */
    async create(data) {
        const newConfigurationId = await sequelize.transaction(async t => {
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

        return newConfigurationId;
    }
}

module.exports = ConfigurationDao;