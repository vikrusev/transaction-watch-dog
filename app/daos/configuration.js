const { Configuration, ConfigurationVersion } = require('../models');
const sequelize = require('../db');

/**
 * DAO for a Configuration
 */
class ConfigurationDao {
    constructor() { }

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