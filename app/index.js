const Server = require('./server');
const EthereumMainnetSubscription = require('./web3')

// The server is responsible for the REST API
const server = new Server();

const port = process.env.APP_PORT ?? 3000
server.start(port);

// The Ethereum Subscription is responsible for listening for new transcations
const ethSubscriptionOptions = {
    subscriptionType: 'pendingTransactions',
    PROVIDER_WEBSOCKET: process.env.PROVIDER_WEBSOCKET
}
const ethSubscription = new EthereumMainnetSubscription(ethSubscriptionOptions);
ethSubscription.startMonitoring();