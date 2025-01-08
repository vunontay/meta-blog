"use strict";

const SECONDS = 5000;

const STATUS_CODE_SUCCESS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
};

const STATUS_CODE_ERROR = {
    FORBIDDEN: 403,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
};

const HEADERS = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization",
    CLIENT_ID: "x-client-id",
    REFRESH_TOKEN: "x-r-token-id",
};

module.exports = { SECONDS, STATUS_CODE_SUCCESS, STATUS_CODE_ERROR, HEADERS };
