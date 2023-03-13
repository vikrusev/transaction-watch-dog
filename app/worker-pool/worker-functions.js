const WorkerPool = require('./')
const functions = require('../web3/transaction-utilities')

// MIDDLEWARE FUNCTIONS
const filterTransactions = (transaction, activeConfigurationList) => {
    return functions.filterTransactions(transaction, activeConfigurationList)
}

// CREATE WORKERS
WorkerPool.createWorker({
    filterTransactions
})
