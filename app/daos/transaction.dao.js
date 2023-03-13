const { Transaction, TransactionConfigVersion } = require('../models')
const sequelize = require('../db')

/**
 * DAO for a Transactions
 */
class TransactionDao {
    constructor() {}

    async bulkInsertTransctions(entries) {
        // get an array of the actual Transactions data
        const transactionsData = Object.values(entries).map(
            (transaction) => transaction.transactionData
        )

        return await sequelize.transaction(async () => {
            const newTransactions = await Transaction.bulkCreate(
                transactionsData
            )

            const flatMapRelations =
                this.flatMapNewTransactionIdToConfigurationVersion(
                    newTransactions,
                    entries
                )
            await TransactionConfigVersion.bulkCreate(flatMapRelations)

            console.log(
                `Successfully added ${newTransactions.length} transactions!`
            )
        })
    }

    /**
     * The idea is to make this: [ { id: 5, array: [1,2,3] }, { id: 6, array: [4,5,6] } ];
     * Into this [ { id: 5, val: 1 },
                    { id: 5, val: 2 },
                    { id: 5, val: 3 },
                    { id: 6, val: 4 },
                    { id: 6, val: 5 },
                    { id: 6, val: 6 } ]
     * @param {*} newTransactions 
     * @param {*} entries 
     * @returns the proper format for inserting relations with bulkCreate
     */
    flatMapNewTransactionIdToConfigurationVersion(newTransactions, entries) {
        const relations = newTransactions.map((transaction) => {
            const entry = entries[transaction.hash]
            return {
                transactionId: transaction.id,
                configurationVersionIds: entry.configurationIds
            }
        })

        return relations.flatMap((relation) =>
            relation.configurationVersionIds.map((configVersionId) => ({
                transactionId: relation.transactionId,
                configVersionId
            }))
        )
    }
}

module.exports = TransactionDao
