'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.TransactionConfigVersion)
    }
  }
  Transaction.init({
    // Meaningful properties of an Ethereum transaction
    hash: DataTypes.STRING,
    blockNumber: DataTypes.INTEGER,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    value: DataTypes.STRING,
    gas: DataTypes.INTEGER,
    gasPrice: DataTypes.STRING,
    nonce: DataTypes.INTEGER,

    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};