const { SuccessResponse } = require("../middlewares/success-response");
const UserService = require("../services/user-service");

class UserController {
    getUserInfo = async (req, res, next) => {
        new SuccessResponse({
            message: "Lấy thông tin người dùng thành công.",
            metadata: await UserService.getUserInfo(req.params),
        }).send(res);
    };
}

module.exports = new UserController();
