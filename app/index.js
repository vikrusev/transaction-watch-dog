const Server = require('./server');
const WorkerPool = require('./worker-pool');
const EthereumMainnetSubscription = require('./web3')

// The server is responsible for the REST API
const server = new Server();

const port = process.env.APP_PORT ?? 3000
server.start(port);

;(async () => {
    // Init Worker Pool
    if (process.env.WORKER_POOL_ENABLED === '1') {
        const options = { minWorkers: 'max' }
        await WorkerPool.init(options)
    }

    // The Ethereum Subscription is responsible for listening for new transcations
    const ethSubscriptionOptions = {
        subscriptionType: 'pendingTransactions',
        PROVIDER_WEBSOCKET: process.env.PROVIDER_WEBSOCKET
    }
    const ethSubscription = new EthereumMainnetSubscription(ethSubscriptionOptions);
    ethSubscription.startMonitoring();
})()
