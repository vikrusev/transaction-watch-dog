const ActiveConfiguration = require('../services/active-configuration')

/**
 * Updates Current Active Configuration List
 * Uses the reply.raw.on('finish') event
 * @param {*} request 
 * @param {*} reply 
 * @param {*} done 
 */
module.exports = (request, reply, done) => {
    reply.raw.on('finish', async () => {
        await ActiveConfiguration.updateActiveConfigurationList()
    })
    done();
}