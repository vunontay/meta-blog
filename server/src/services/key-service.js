const crypto = require("crypto");
const createError = require("http-errors");
const apiKeyRepository = require("../repositories/key-repository");

class KeyService {
    static async getKeys(key) {
        const objectKey = await apiKeyModel
            .findOne({ key, status: true })
            .lean();
        return objectKey;
    }

    static async generateKey() {
        const key = crypto.randomBytes(32).toString("hex");
        const newKey = await apiKeyRepository.createKey(key);
        return newKey;
    }
}

module.exports = KeyService;
