class ApiError {
    constructor(code, message) {
        this.message = message;
        this.code = code;
    }
}

class BadRequestException extends ApiError {
    constructor(message) {
        super(400, message)
    }
}

class NotFoundException extends ApiError {
    constructor(message) {
        super(404, message)
    }
}

class InternalServerException extends ApiError {
    constructor(message) {
        super(500, message)
    }
}

module.exports = {
    BadRequestException,
    NotFoundException,
    InternalServerException
};