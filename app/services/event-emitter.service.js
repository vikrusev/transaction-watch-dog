const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

const TransactionDao = require('../daos/transaction.dao')

const ActiveConfiguration = require('./active-configuration.service')
const functions = require('../web3/transaction-utilities')

const WorkerPool = require('../worker-pool');

const transactionsData = [];

// Add an event listener
eventEmitter.on('new-transaction', (transactionData) => {
    transactionsData.push(transactionData)
});

// Accumulate transactions for X amount of milliseconds
// Then provide all to a worker thread
setInterval(async () => {
    const copiedTransactions = transactionsData.map(transaction => {return {...transaction}})

    // check if the workerpool is enabled from the environment
    if (process.env.WORKER_POOL_ENABLED === '1') {
        // execute a function through the workerPool middlware proxy
        const workerPoolProxy = WorkerPool.getProxy()

        try {
            const filteredTransactions = await workerPoolProxy.filterTransactions(copiedTransactions, ActiveConfiguration.getActiveConfigurationList())
            if (Object.keys(filteredTransactions).length) {
                await (new TransactionDao()).bulkInsertTransctions(filteredTransactions)
            }
        }
        catch(error) {
            console.error(`Something happened while filtering and bulk inserting data. Error: ${error}`)
        }
    } else { // TODO check
        const result = functions.filterTransactions(copiedTransactions)
    }

    // reset the accumulative transactions array
    transactionsData.length = 0
}, 5000)

// Export the event emitter as a module
module.exports = eventEmitter;