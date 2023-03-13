const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

const ActiveConfiguration = require('./active-configuration')
const functions = require('../web3/transaction-utilities')

const WorkerPool = require('../worker-pool');

// Add an event listener
eventEmitter.on('new-transaction', async (transactionData) => {
    // check if the workerpool is enabled from the environment
    if (process.env.WORKER_POOL_ENABLED === '1') {
        // execute a function through the workerPool middlware proxy
        const workerPoolProxy = WorkerPool.getProxy()
        const result = await workerPoolProxy.filterTransactions(transactionData, ActiveConfiguration.getActiveConfigurationList())
    } else { // TODO check
        setInterval(async () => {
            const result = await functions.filterTransactions(transactionData)
        }, 5000)
    }
});

// Export the event emitter as a module
module.exports = eventEmitter;