"use strict";

const mongoose = require("mongoose");
const {
    db: { uri },
} = require("../configs/mongodb-config");
const { countConnect } = require("../helpers/check-connect");

class Database {
    constructor() {
        this.connect();
    }

    connect(type = "mongodb") {
        if (process.env.NODE_ENV === "dev") {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }

        if (!uri) {
            console.error("Error: MongoDB URI is not defined");
            process.exit(1);
        }

        mongoose
            .connect(uri, {
                maxPoolSize: 50,
                serverSelectionTimeoutMS: 5000,
                retryWrites: true,
            })
            .then(() => {
                console.log(`Connected to MongoDB successfully`);

                if (process.env.NODE_ENV === "dev") {
                    countConnect();
                }
            })
            .catch((err) => {
                console.error("Error connecting to MongoDB:", err);
                process.exit(1);
            });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
