const apiKeyModel = require("../models/key-model");

class ApiKeyRepository {
    static async createKey(apiKeyData) {
        const apiKey = await apiKeyModel.create({
            key: apiKeyData,
            status: true,
        });
        return apiKey;
    }

    static async findByKey(key) {
        return await apiKeyModel.findOne({ key, status: true });
    }
}

module.exports = ApiKeyRepository;
