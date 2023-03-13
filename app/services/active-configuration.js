const ConfigurationDao = require('../daos/configuration');

/**
 * Service, responsible for managing and providing the active Configurations
 * used for filtering Ethereum pending transactions
 */
class ActiveConfiguration {
    constructor() {
        this.activeConfigurationList = []
        this.configurationDao = new ConfigurationDao();

        this.init = this.init.bind(this)
        this.getActiveConfigurationList = this.getActiveConfigurationList.bind(this)
    }

    /**
     * Initilize the activeConfiguration list
     */
    async init() {
        try {
            this.activeConfigurationList = await this.configurationDao.getCurrentActiveConfigurations()
        }
        catch(error) {
            console.error('Something went wrong while initialising Current Active Configuration List')
            process.exit(-2);
        }
    }

    /**
     * Get the activeConfiguration list
     * @returns 
     */
    getActiveConfigurationList() {
        return this.activeConfigurationList
    }

    /**
     * Update activeConfiguration list by re-initialising
     */
    async updateActiveConfigurationList() {
        await this.init()
    }
}

module.exports = new ActiveConfiguration()