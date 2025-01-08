const createError = require("http-errors");
const apiKeyRepository = require("../repositories/key-repository");
const { HEADERS } = require("../constants/util-constant");

const authenticateApiKey = async (req, res, next) => {
    const apiKey = req.headers[HEADERS.API_KEY]?.toString();

    if (!apiKey) {
        return next(createError(401, "API Key là bắt buộc"));
    }

    const keyRecord = await apiKeyRepository.findByKey(apiKey);

    if (!keyRecord) {
        return next(createError(401, "API Key không hợp lệ"));
    }

    req.keyRecord = keyRecord;
    return next();
};

module.exports = authenticateApiKey;
