const { Configuration } = require('../models');

/**
 * DAO for a Configuration
 */
class ConfigurationDao {
    constructor() { }

    async create(configuration) {
        const result = await Configuration.create(configuration)
        return result.id;
    }
}

module.exports = ConfigurationDao;