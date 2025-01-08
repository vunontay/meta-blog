"use strict";

const { STATUS_CODE_ERROR } = require("../constants/util-constant");

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = "failed";
        this.code = statusCode;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(
        message = "Conflict error",
        statusCode = STATUS_CODE_ERROR.CONFLICT
    ) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(
        message = "Bad request error",
        statusCode = STATUS_CODE_ERROR.BAD_REQUEST
    ) {
        super(message, statusCode);
    }
}

class UnauthorizedError extends ErrorResponse {
    constructor(
        message = "Unauthorized error",
        statusCode = STATUS_CODE_ERROR.UNAUTHORIZED
    ) {
        super(message, statusCode);
    }
}

class ForbiddenRequestError extends ErrorResponse {
    constructor(
        message = "Forbidden error",
        statusCode = STATUS_CODE_ERROR.FORBIDDEN
    ) {
        super(message, statusCode);
    }
}

class NotFoundError extends ErrorResponse {
    constructor(
        message = "Not found error",
        statusCode = STATUS_CODE_ERROR.NOT_FOUND
    ) {
        super(message, statusCode);
    }
}

class InternalServerError extends ErrorResponse {
    constructor(
        message = "Internal server error",
        statusCode = STATUS_CODE_ERROR.INTERNAL_SERVER
    ) {
        super(message, statusCode);
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenRequestError,
    NotFoundError,
    InternalServerError,
};
