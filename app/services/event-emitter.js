const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

const ActiveConfiguration = require('./active-configuration')
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
        const result = await workerPoolProxy.filterTransactions(copiedTransactions, ActiveConfiguration.getActiveConfigurationList())
    } else { // TODO check
        const result = await functions.filterTransactions(copiedTransactions)
    }

    // reset the accumulative transactions array
    transactionsData.length = 0
}, 5000)

// Export the event emitter as a module
module.exports = eventEmitter;