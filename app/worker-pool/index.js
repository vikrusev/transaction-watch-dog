const workerPool = require('workerpool')
const { join } = require('path')

/**
 * WorkerPool class
 *
 * Initialize w/ a proxy of middleware functions
 * Create thread workers for the given functions
 */
class WorkerPool {
    constructor() {
        this.poolProxy = null
    }

    /**
     * Initialise pool and poolProxy
     * @param {*} options - how to initialise the worker pool
     */
    async init(options) {
        const pool = workerPool.pool(
            join(`${__dirname}/worker-functions.js`),
            options
        )
        this.poolProxy = await pool.proxy()
        console.log(
            `Worker Threads Enabled - Min Workers: ${pool.minWorkers} - Max Workers: ${pool.maxWorkers} - Worker Type: ${pool.workerType}`
        )
    }

    /**
     * Getter for poolProxy
     * @returns poolProxy
     */
    getProxy() {
        return this.poolProxy
    }

    /**
     * Create worker for needed functions
     * @param {*} functions
     */
    createWorker(functions) {
        workerPool.worker(functions)
    }
}

module.exports = new WorkerPool()
