"use strict";

const { STATUS_CODE_SUCCESS } = require("../constants/util-constant");

class SuccessResponse {
    constructor({
        message,
        statusCode = STATUS_CODE_SUCCESS.OK,
        metadata = {},
    }) {
        this.message = message;
        this.status = "success";
        this.code = statusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.code).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message = "Success", metadata = {} }) {
        super({
            message,
            statusCode: STATUS_CODE_SUCCESS.OK,
            metadata,
        });
    }
}

class CREATED extends SuccessResponse {
    constructor({ message = "Created Successfully", metadata = {} }) {
        super({
            message,
            statusCode: STATUS_CODE_SUCCESS.CREATED,
            metadata,
        });
    }
}

module.exports = {
    OK,
    CREATED,
    SuccessResponse,
};
