const Web3Eth = require('web3-eth');
const eventEmitter = require('../services/event-emitter')

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
                this.web3.getTransaction(txHash).then((transactionData) => {
                    if (transactionData) {
                        eventEmitter.emit('new-transaction', transactionData)
                    }
                });
            })
    }

    stopMonitoring() {
        this.subscription.unsubscribe(() => {
            console.log('Successfully unsubscribed!')
        })
    }
}

module.exports = EthereumMainnetSubscription;
