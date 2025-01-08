"use strict";

const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3052,
    },
    db: {
        uri: process.env.MONGO_URI_DEV,
    },
};

const pro = {
    app: {
        port: process.env.PRO_APP_PORT || 3000,
    },
    db: {
        uri: process.env.MONGO_URI_PRO,
    },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
