const STATUS_CONNECT_REDIS = {
    CONNECTED: "connect",
    END: "end",
    RECONNECT: "reconnecting",
    ERROR: "error",
    DISCONNECTED: "disconnected",
};

const REDIS_CONNECT_TIMEOUT = 10000;
const REDIS_CONNECT_MESSAGE = {
    code: -99,
    message: {
        en: "Redis connection timeout",
        vi: "Kết nối Redis quá thời gian",
    },
};

module.exports = {
    STATUS_CONNECT_REDIS,
    REDIS_CONNECT_TIMEOUT,
    REDIS_CONNECT_MESSAGE,
};
