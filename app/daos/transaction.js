const { Transaction, TransactionConfigVersion } = require('../models');
const sequelize = require('../db');

/**
 * DAO for a Transactions
 */
class TransactionDao {
    constructor() { }

    async bulkInsertTransctions(entries) {
        // get an array of the actual Transactions data
        const transactionsData = Object.values(entries).map(transaction => transaction.transactionData)

        return await sequelize.transaction(async t => {
            const newTransactions = await Transaction.bulkCreate(transactionsData);
            console.log(`Successfully added ${newTransactions.length} transactions!`)
        })
    }
}

module.exports = TransactionDao;