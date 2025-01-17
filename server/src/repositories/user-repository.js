const userModel = require("../models/user-model");
const { convertToObjectIdMongodb, getUnSelectData } = require("../utils/util");

class UserRepository {
    static async getUserById(userId, unSelect = []) {
        return await userModel
            .findById(convertToObjectIdMongodb(userId))
            .select(getUnSelectData(unSelect))
            .lean()
            .exec();
    }
}

module.exports = UserRepository;
