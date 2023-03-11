const ApiError = require('./api-error');

function apiErrorHandler(err, request, reply) {
    request.log.error(`An error has occured. code: ${err.code} | message: ${err.message}`)

    if (err instanceof ApiError) {
        reply.statusCode = err.code;
        return { message: err.message };
    }

    reply.statusCode = 500;
    return ApiError.internal('Something went wrong');
}

module.exports = apiErrorHandler;