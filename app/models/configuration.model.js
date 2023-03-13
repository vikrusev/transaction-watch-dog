'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Configuration extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.ConfigurationVersion, {
                as: 'ConfigurationRules',
                foreignKey: 'configId'
            })
        }
    }
    Configuration.init(
        {
            active: DataTypes.BOOLEAN,
            deletedAt: DataTypes.DATE,

            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                type: DataTypes.DATE
            }
        },
        {
            sequelize,
            paranoid: true,
            modelName: 'Configuration'
        }
    )
    return Configuration
}
