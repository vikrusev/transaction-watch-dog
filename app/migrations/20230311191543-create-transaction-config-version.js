'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransactionConfigVersions', {
      transactionId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      configVersionId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },

      // Created by Sequelize
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TransactionConfigVersions');
  }
};