/**
 * Filter transactions which should be saved in the DB
 * The worker_thread should not insert in the DB directly
 * @param {*} transactionsData - a chunk of transactions to be filtered by a worker_thread
 * @param {*} activeConfigurationList - a list of the current active Configurations
 * @returns the transactions to be saved in the DB from the mainThread
 *      - it is an object w/ keys - Transaction hashes and values - array of ConfigurationVersion ids
 */
const filterTransactions = (transactionsData, activeConfigurationList) => {
    // key is id of the Transaction and value is an array of which Configurations satisfy it
    const transactionsWithConfigurations = []

    // Loop all transactions and all Configurations
    for (const transaction of transactionsData) {
        for (const configuration of activeConfigurationList) {
            // check if the Transaction is satisfied by the Configuration
            const isSatisfied = satisfiedByConfiguration(transaction, configuration)

            if (isSatisfied) {
                transactionsWithConfigurations.push({
                    hash: transaction.hash,
                    configVersionId: configuration['ConfigurationRules.id']
                })
            }
        }
    }

    return transactionsWithConfigurations
}

/**
 * Checks if the Transaction satisfies the Configuration
 * @returns if the transaction satisfies a Configuration
 */
const satisfiedByConfiguration = (transaction, configuration) => {
    // remove the ConfigurationRules prefixes from the Configuration properties
    configuration = getCleanConfigurationRules(configuration)

    // return true if there is no Configuration entry which
    // has a different key that the ones specified below
    // exists satisfies the Transaction
    return !Object.entries(configuration).some(
        ([key, value]) =>
            key !== 'id' &&
            key !== 'versionNumber' &&
            key !== 'createdAt' &&
            key !== 'generalizedMathFormula' &&
            value !== null &&
            value !== transaction[key]
    )
}

/**
 * Remove ConfigurationRules. prefixes from the Configuration object
 * @param {*} configuration 
 * @returns object w/ ConfigurationRules w/ no prefixes
 */
const getCleanConfigurationRules = (configuration) => {
    return Object.keys(configuration)
                .filter((key) => key.startsWith('ConfigurationRules'))
                .reduce((newData, key) => {
                    const [prefix, k] = key.split('.')
                    newData[k] = configuration[key]
                    return newData
                }, {})
}

module.exports = {
    filterTransactions
};