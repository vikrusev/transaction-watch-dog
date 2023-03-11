const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

// Add an event listener
eventEmitter.on('test-event', (transactionData) => {
    console.log(`New transaction: ${JSON.stringify(transactionData)}`)
});

// Export the event emitter as a module
module.exports = eventEmitter;