const roleModel = require("../models/role-model");
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { convertToObjectIdMongodb } = require("../utils/util");

class AuthRepository {
    static async findUserByEmailOrUsername(email, username) {
        return userModel.findOne({
            $or: [{ email }, { username }],
        });
    }

    static async findUserById(userId) {
        return userModel.findById({ _id: convertToObjectIdMongodb(userId) });
    }

    static async findUserByEmail(email) {
        return userModel.findOne({ email }).populate("role_id");
    }

    static async findDefaultRole() {
        return roleModel.findOne({ name: "User" });
    }

    static async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }

    static async comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }

    static async createUser({ email, username, passwordHash, roleId }) {
        return userModel.create({
            email,
            username,
            password: passwordHash,
            role_id: roleId,
            status: "active",
        });
    }
}

module.exports = AuthRepository;
