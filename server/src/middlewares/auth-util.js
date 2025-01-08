const jwt = require("jsonwebtoken");
const { HEADERS } = require("../constants/util-constant");
const { initRedis } = require("../libs/init-redis");
const createHttpError = require("http-errors");

const generateAccessToken = async (payload) => {
    try {
        const access_token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "30m",
        });
        return access_token;
    } catch (error) {
        throw error;
    }
};

const generateRefreshToken = async (payload) => {
    try {
        const redisClient = await initRedis();
        const refresh_token = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Xóa token cũ nếu có
        await redisClient.del(`refresh_token:${payload.userId.toString()}`);

        // Lưu token mới
        await redisClient.set(
            `refresh_token:${payload.userId.toString()}`,
            refresh_token
        );
        await redisClient.expire(
            `refresh_token:${payload.userId.toString()}`,
            604800
        );

        return refresh_token;
    } catch (error) {
        throw error;
    }
};

const generateTokens = async (payload) => {
    try {
        const access_token = await generateAccessToken(payload);
        const refresh_token = await generateRefreshToken(payload);
        return { access_token, refresh_token };
    } catch (error) {
        throw error;
    }
};

const authentication = async (req, res, next) => {
    const accessToken = req.headers[HEADERS.AUTHORIZATION];

    if (!accessToken) {
        throw createHttpError.Unauthorized("Token không tồn tại.");
    }
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return next(createHttpError.Unauthorized("Token đã hết hạn."));
            }

            return next(createHttpError.Unauthorized("Token không hợp lệ."));
        }

        req.user = user;
        next();
    });
};

verifyAccessToken = async (accessToken) => {
    try {
        const decodedAccess = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET
        );
        return decodedAccess;
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            throw createHttpError.Unauthorized("Access Token không hợp lệ");
        }
        if (error.name === "TokenExpiredError") {
            throw createHttpError.Unauthorized("Access Token đã hết hạn");
        }
        throw error;
    }
};

const verifyRefreshToken = async (refreshToken) => {
    if (!refreshToken) {
        throw createHttpError.BadRequest("Refresh token không được để trống");
    }

    try {
        const decodedRefresh = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const redisClient = await initRedis();
        const storedToken = await redisClient.get(
            `refresh_token:${decodedRefresh.userId.toString()}`
        );

        if (!storedToken || storedToken !== refreshToken) {
            throw createHttpError.Unauthorized(
                "Refresh token không hợp lệ hoặc đã bị thu hồi"
            );
        }

        return decodedRefresh;
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            throw createHttpError.Unauthorized("Refresh Token không hợp lệ");
        }
        if (error.name === "TokenExpiredError") {
            throw createHttpError.Unauthorized("Refresh Token đã hết hạn");
        }
        throw error;
    }
};
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateTokens,
    authentication,
    verifyRefreshToken,
    verifyAccessToken,
};
