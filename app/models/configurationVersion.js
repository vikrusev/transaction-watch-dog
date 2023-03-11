'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConfigurationVersion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ConfigurationVersion.init({
    // Own
    versionNumber: DataTypes.INTEGER,
    configId: DataTypes.INTEGER,
    generalizedMathFormula: DataTypes.STRING,

    // Taken from the Transaction model
    // Basically, these are the rules
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
    modelName: 'ConfigurationVersion',
  });
  return ConfigurationVersion;
};