'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Configuration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Configuration.init({
    active: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE,

    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Configuration',
  });
  return Configuration;
};