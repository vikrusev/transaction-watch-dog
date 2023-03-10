'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Transactions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            hash: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            blockNumber: {
                type: Sequelize.INTEGER
            },
            from: {
                type: Sequelize.STRING,
                allowNull: false
            },
            to: {
                type: Sequelize.STRING
                // allowNull: false // can actually be null
            },
            value: {
                type: Sequelize.STRING,
                allowNull: false
            },
            gas: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            gasPrice: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nonce: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            // Created by Sequelize
            deletedAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        })
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Transactions')
    }
}
