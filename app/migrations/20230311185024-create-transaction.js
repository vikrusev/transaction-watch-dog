'use strict';
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
        type: Sequelize.INTEGER,
        allowNull: false
      },
      from: {
        type: Sequelize.STRING,
        allowNull: false
      },
      to: {
        type: Sequelize.STRING,
        allowNull: false
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};