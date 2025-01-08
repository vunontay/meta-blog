const createHttpError = require("http-errors");
const { getInfoData } = require("../utils/util");
const {
    registerValidate,
    loginValidate,
} = require("../validations/auth-validate");
const AuthRepository = require("../repositories/auth-repository");
const {
    generateTokens,
    verifyRefreshToken,
    generateAccessToken,
} = require("../middlewares/auth-util");
const JWT = require("jsonwebtoken");
const { initRedis } = require("../libs/init-redis");
class AuthService {
    static async register(payload) {
        const { email, username, password } = payload;
        const { error } = registerValidate(payload);

        // Kiểm tra dữ liệu đầu vào
        if (error) {
            throw createHttpError.BadRequest(error.details[0].message);
        }

        // Kiểm tra email hoặc username đã tồn tại chưa
        const existingUser = await AuthRepository.findUserByEmailOrUsername(
            email,
            username
        );
        if (existingUser) {
            const field = existingUser.email === email ? "Email" : "Username";
            throw createHttpError.Conflict(`${field} đã tồn tại.`);
        }

        // Tìm role mặc định
        const userRole = await AuthRepository.findDefaultRole();
        if (!userRole) {
            throw createHttpError.BadRequest("Vai trò mặc định không tồn tại.");
        }

        // Mã hóa mật khẩu
        const passwordHash = await AuthRepository.hashPassword(password);

        // Tạo user mới
        const user = await AuthRepository.createUser({
            email,
            username,
            passwordHash,
            roleId: userRole._id,
        });

        // Kiểm tra user đã được tạo chưa
        if (!user) {
            throw createHttpError.InternalServerError("Tạo user thất bại.");
        }

        // Trả về thông tin user
        return {
            user: getInfoData({
                fields: ["_id", "username", "email"],
                object: user,
            }),
        };
    }

    static async login(payload) {
        const { email, password } = payload;
        const { error } = loginValidate(payload);

        // Kiểm tra dữ liệu đầu vào
        if (error) {
            throw createHttpError.BadRequest(error.details[0].message);
        }

        // Tìm user theo email
        const user = await AuthRepository.findUserByEmail(email);
        if (!user) {
            throw createHttpError.NotFound("Email không tồn tại.");
        }

        // So sánh mật khẩu
        const isMatch = await AuthRepository.comparePassword(
            password,
            user.password
        );
        if (!isMatch) {
            throw createHttpError.Unauthorized("Mật khẩu không chính xác.");
        }

        // Lấy thông tin user
        const userInfo = getInfoData({
            fields: ["_id", "username", "email", "status"],
            object: user,
        });

        // Tạo token
        const tokens = await generateTokens({
            userId: user._id,
            email: user.email,
            roleId: user.role_id._id,
        });

        return {
            user: userInfo,
            tokens,
        };
    }

    static async refreshToken(refresh_token, access_token) {
        // Kiểm tra dữ liệu đầu vào
        if (!refresh_token || !access_token) {
            throw createHttpError.BadRequest(
                "Access token và refresh token là bắt buộc"
            );
        }

        const accessDecoded = JWT.decode(access_token);
        if (!accessDecoded) {
            throw createHttpError.Unauthorized("Token không hợp lệ.");
        }

        // Kiểm tra refresh token
        const refreshDecoded = await verifyRefreshToken(refresh_token);

        if (refreshDecoded.userId !== accessDecoded.userId) {
            throw createHttpError.Unauthorized(
                "Token không khớp với người dùng"
            );
        }

        // Tạo token mới
        const newAccessToken = await generateAccessToken({
            userId: accessDecoded.userId,
            email: accessDecoded.email,
            roleId: accessDecoded.roleId,
        });

        return {
            tokens: {
                access_token: newAccessToken,
                refresh_token: refresh_token,
            },
        };
    }

    static logout = async (refresh_token) => {
        // Kiểm tra dữ liệu đầu vào
        if (!refresh_token) {
            throw createHttpError.BadRequest("Refresh token là bắt buộc");
        }

        const decodedRefresh = await verifyRefreshToken(refresh_token);
        if (!decodedRefresh) {
            throw createHttpError.Unauthorized("Refresh token không hợp lệ");
        }

        // Xóa refresh token khỏi redis
        const redisClient = await initRedis();
        await redisClient.del(
            `refresh_token:${decodedRefresh.userId.toString()}`
        );
    };
}

module.exports = AuthService;
