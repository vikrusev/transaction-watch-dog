const ApiError = require('../errors/api-error');

/**
 * Validate incoming requests
 * Uses request.params for GET requests
 * And request.body for POST, PUT, PATCH
 * @param {*} schema 
 * @returns 
 */
function validate(schema) {
  return (request, reply, done) => {
        const requestData = request.method === 'GET' ? request.params : request.body;
        const { error, value } = schema.validate(requestData);

        if (error) {
            done(ApiError.badRequest(error.message ?? error.details[0].message));
            return;
        }

        done();
    };
}

module.exports = validate;
