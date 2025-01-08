"use strict";

require("dotenv").config();

const dev = {
    redis: {
        host: process.env.REDIS_HOST_DEV || "127.0.0.1",
        port: process.env.REDIS_PORT_DEV || 6379,
        password: process.env.REDIS_PASSWORD_DEV || "",
    },
};

const pro = {
    redis: {
        host: process.env.REDIS_HOST_PRO || "127.0.0.1",
        port: process.env.REDIS_PORT_PRO || 6379,
        password: process.env.REDIS_PASSWORD_PRO || "",
    },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
