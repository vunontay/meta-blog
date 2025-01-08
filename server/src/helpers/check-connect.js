"use strict";
const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const { SECONDS } = require("../constants/util-constant");

// COUNT CONNECT
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections: ${numConnection}`);
};

// CHECK OVERLOAD
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;

        //   EXAMPLE MAX CONNECTIONS NUMBER OF THE CORE
        const maxConnections = numCores * 5;

        console.log(`Active connections: ${numConnection}`);
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

        if (numConnection > maxConnections) {
            console.log("Connection overload detected");
        }
    }, SECONDS);
};
module.exports = { countConnect, checkOverload };
