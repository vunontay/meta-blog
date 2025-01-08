"use strict";

const redis = require("redis");
const dotenv = require("dotenv");
const {
    REDIS_CONNECT_MESSAGE,
    REDIS_CONNECT_TIMEOUT,
    STATUS_CONNECT_REDIS,
} = require("../constants/redis-constant");

dotenv.config();

let connectTimeout;
let instanceRedis;

const handleErrorsTimeOut = () => {
    connectTimeout = setTimeout(() => {
        throw new Error(REDIS_CONNECT_MESSAGE.message.vi);
    }, REDIS_CONNECT_TIMEOUT);
};

const handleEventConnection = (connectionRedis) => {
    connectionRedis.on(STATUS_CONNECT_REDIS.CONNECTED, function () {
        console.log("Redis connected");
        clearTimeout(connectTimeout);
    });

    connectionRedis.on(STATUS_CONNECT_REDIS.END, function () {
        console.log("Redis connection ended");
        handleErrorsTimeOut();
    });

    connectionRedis.on(STATUS_CONNECT_REDIS.RECONNECT, function () {
        console.log("Redis reconnecting...");
        clearTimeout(connectTimeout);
    });

    connectionRedis.on(STATUS_CONNECT_REDIS.ERROR, function (error) {
        console.log("Redis error:", error);
        handleErrorsTimeOut();
    });
};

const initRedis = async () => {
    if (instanceRedis) {
        console.log("Redis is already connected.");
        return instanceRedis;
    }

    instanceRedis = redis.createClient({
        url: process.env.REDIS_URL,
        socket: {
            tls: true,
        },
    });

    handleEventConnection(instanceRedis);

    try {
        await instanceRedis.connect();
        console.log("Redis connected successfully");
    } catch (err) {
        console.error("Redis connection failed:", err);
        throw new Error("Redis connection failed.");
    }

    return instanceRedis;
};

const closeRedis = async () => {
    if (instanceRedis) {
        try {
            await instanceRedis.quit();
            console.log("Redis connection closed.");
        } catch (err) {
            console.error("Error closing Redis connection:", err);
        }
    }
};

module.exports = { initRedis, closeRedis };
