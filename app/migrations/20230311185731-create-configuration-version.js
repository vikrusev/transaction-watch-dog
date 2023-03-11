'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ConfigurationVersions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      versionNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      configId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Configurations',
          key: 'id'
        }
      },
      generalizedMathFormula: {
        type: Sequelize.STRING
      },

      // Taken from the Transaction model
      // They are all optional, allowNull defaults to true
      hash: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      blockNumber: {
        type: Sequelize.INTEGER,
      },
      from: {
        type: Sequelize.STRING,
      },
      to: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.STRING,
      },
      gas: {
        type: Sequelize.INTEGER,
      },
      gasPrice: {
        type: Sequelize.STRING,
      },
      nonce: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('ConfigurationVersions');
  }
};