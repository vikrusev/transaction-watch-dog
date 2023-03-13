'use strict'

const { readFileSync } = require('fs')
const path = require('path')

const dataFilePath = path.join(__dirname, 'default-configuration.json')
const data = JSON.parse(readFileSync(dataFilePath, 'utf8'))

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('Configurations', data.configuration)
        await queryInterface.bulkInsert(
            'ConfigurationVersions',
            data.configurationVersion
        )
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('ConfigurationVersions', null, {})
        await queryInterface.bulkDelete('Configurations', null, {})
    }
}
