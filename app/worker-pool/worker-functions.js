const WorkerPool = require('./')
const functions = require('../web3/transaction-utilities')

// MIDDLEWARE FUNCTIONS
const filterTransactions = (transaction) => {
    return functions.filterTransactions(transaction)
}

// CREATE WORKERS
WorkerPool.createWorker({
    filterTransactions
})
