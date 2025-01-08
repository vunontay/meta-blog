const { CREATED, SuccessResponse } = require("../middlewares/success-response");
const { HEADERS } = require("../constants/util-constant");
const AuthService = require("../services/auth-service");

class AuthController {
    login = async (req, res, next) => {
        new SuccessResponse({
            message: "Đăng nhập thành công.",
            metadata: await AuthService.login(req.body),
        }).send(res);
    };

    register = async (req, res, next) => {
        new CREATED({
            message: "Đăng ký tài khoản thành công.",
            metadata: await AuthService.register(req.body),
        }).send(res);
    };

    refreshToken = async (req, res, next) => {
        const access_token = req.headers[HEADERS.AUTHORIZATION];
        const refresh_token = req.body.refresh_token;
        new SuccessResponse({
            message: "Lấy token mới thành công.",
            metadata: await AuthService.refreshToken(
                refresh_token,
                access_token
            ),
        }).send(res);
    };

    logout = async (req, res, next) => {
        const refresh_token = req.body.refresh_token;
        new SuccessResponse({
            message: "Đăng xuất thành công.",
            metadata: await AuthService.logout(refresh_token),
        }).send(res);
    };
}

module.exports = new AuthController();
