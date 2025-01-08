const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const dotenv = require("dotenv");
const createError = require("http-errors"); // Renamed for clarity
const app = express();

// INITIALIZE MIDDLEWARES
dotenv.config();
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// INITIALIZE DATABASE
require("./libs/init-mongodb");

// INITIALIZE REDIS
const { initRedis } = require("./libs/init-redis");
initRedis();

// const { checkOverload } = require("./helpers/check-connect");
// checkOverload();

// INITIALIZE ROUTES
app.use("/", require("./routes"));

// HANDLE 404 NOT FOUND
app.use((req, res, next) => {
    next(createError(404, "Not Found"));
});

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    const statusCode = err.status || err.statusCode || 500;
    const response = {
        status: statusCode >= 400 && statusCode < 500 ? "fail" : "error",
        code: statusCode,
        message: err.message || "Internal Server Error",
    };

    if (process.env.NODE_ENV === "dev") {
        response.stack = err.stack; // Include stack trace in development
    }

    res.status(statusCode).json(response);
});

module.exports = app;
