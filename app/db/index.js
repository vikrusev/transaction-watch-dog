const cls = require('cls-hooked')
const namespace = cls.createNamespace('my-very-own-namespace')

const { Sequelize } = require('sequelize')
Sequelize.useCLS(namespace)

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]

module.exports = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
)
