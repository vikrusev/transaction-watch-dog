'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionConfigVersion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Transaction, {
        foreignKey: {
          name: 'transactionId',
          allowNull: false
        }
      })
    }
  }
  TransactionConfigVersion.init({
    transactionId: DataTypes.INTEGER,
    configVersionId: DataTypes.INTEGER,

    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TransactionConfigVersion',
  });
  return TransactionConfigVersion;
};