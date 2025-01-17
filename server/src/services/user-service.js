const createHttpError = require("http-errors");
const { getUserById } = require("../repositories/user-repository");

class UserService {
    static async getUserInfo(params) {
        const { userId } = params;

        const user = await getUserById(userId, ["password", "__v"]);
        if (!user) {
            throw createHttpError.BadRequest("Không tìm thấy user");
        }

        return user;
    }
}

module.exports = UserService;
