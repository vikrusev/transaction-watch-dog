const { ApiError } = require('./api-error.class')

function apiErrorHandler(err, request, reply) {
    request.log.error(
        `An error has occured. code: ${err.code} | message: ${err.message}`
    )

    if (err instanceof ApiError) {
        reply.statusCode = err.code
        return { message: err.message }
    }

    reply.statusCode = 500
    return { message: 'Something went wrong' }
}

module.exports = apiErrorHandler
