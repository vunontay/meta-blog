"use strict";

const pick = require("lodash/pick");
const slugify = require("slugify");
const { Types } = require("mongoose");

const getInfoData = ({ fields = [], object = {} }) => {
    return pick(object, fields);
};

const getSelectData = (select = []) => {
    if (!Array.isArray(select)) {
        throw new Error("Băm select phải là một mảng các chuỗi");
    }
    return Object.fromEntries(select.map((field) => [field, 1]));
};

const getUnSelectData = (unselect = []) => {
    if (!Array.isArray(unselect)) {
        throw new Error("Băm unselect phải là một mảng các chuỗi");
    }
    return Object.fromEntries(unselect.map((field) => [field, 0]));
};

const removeUndefinedFields = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key] === undefined || obj[key] === null) {
            delete obj[key];
        }
    });
    return obj;
};

const updateNestedObjectParser = (object) => {
    const result = {};

    Object.keys(object).forEach((key) => {
        if (typeof object[key] === "object" && !Array.isArray(object[key])) {
            const response = updateNestedObjectParser(object[key]);
            Object.keys(response).forEach((resKey) => {
                result[`${key}.${resKey}`] = response[resKey];
            });
        } else {
            result[key] = object[key];
        }
    });

    return result;
};

const convertToObjectIdMongodb = (id) => {
    return new Types.ObjectId(id);
};

const generateKey = () => {
    // CREATE PUBLIC KEY, PRIVATE KEY
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    return { privateKey, publicKey };
};

const generateSlug = (title) => {
    return slugify(title, {
        lower: true,
        strict: true,
        replacement: "-",
    });
};

module.exports = {
    getInfoData,
    getSelectData,
    getUnSelectData,
    removeUndefinedFields,
    updateNestedObjectParser,
    convertToObjectIdMongodb,
    generateKey,
    generateSlug,
};
