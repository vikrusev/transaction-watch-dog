/**
 * Filter transactions which should be saved in the DB
 * The worker_thread should not insert in the DB directly
 * @param {*} transactionsData - a chunk of transactions to be filtered by a worker_thread
 * @param {*} activeConfigurationList - a list of the current active Configurations
 * @returns the transactions to be saved in the DB from the mainThread
 */
const filterTransactions = (transactionsData, activeConfigurationList) => {
    const result = transactionsData.length

    return result;
}

module.exports = {
    filterTransactions
};