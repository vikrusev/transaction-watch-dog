const Web3Eth = require('web3-eth');

class EthereumMainnetSubscription {
    constructor({ subscriptionType, PROVIDER_WEBSOCKET }) {
        this.web3 = new Web3Eth(PROVIDER_WEBSOCKET);
        this.subscription = this.subscribeToNewPendingTransactions(subscriptionType)
    }

    subscribeToNewPendingTransactions(subscriptionType) {
        return this.web3.subscribe(subscriptionType)
            .on('connected', (subscriptionId) => {
                console.log(`Successfully connected subscription w/ id: ${subscriptionId}`)
            })
            .on('error', console.error);
    }

    startMonitoring() {
        this.subscription
            .on('data', (txHash) => {
                console.log(`New transaction: ${txHash}`)
                // get transaction and emit to nodejs event
                // a service should be subscribed to the event
                // this.web3.getTransaction(txHash).then(response => console.log(`${txHash}: ${JSON.stringify(response)}`));
            })
    }

    stopMonitoring() {
        this.subscription.unsubscribe(() => {
            console.log('Successfully unsubscribed!')
        })
    }
}

module.exports = EthereumMainnetSubscription;
