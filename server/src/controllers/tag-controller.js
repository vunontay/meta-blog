"use strict";

const { CREATED, SuccessResponse } = require("../middlewares/success-response");
const TagService = require("../services/tag-service");

class TagController {
    createTag = async (req, res, next) => {
        new CREATED({
            message: "Tag đã được tạo.",
            metadata: await TagService.createTag(req.body),
        }).send(res);
    };

    getAllTag = async (req, res, next) => {
        new SuccessResponse({
            message: "Lấy Tag thành công.",
            metadata: await TagService.getAllTag(req.query),
        }).send(res);
    };

    getTagById = async (req, res, next) => {
        new SuccessResponse({
            message: "Lấy Tag thành công.",
            metadata: await TagService.getTagById(req.params),
        }).send(res);
    };

    updateTagById = async (req, res, next) => {
        new SuccessResponse({
            message: "Cập nhật Tag thành công.",
            metadata: await TagService.updateTagById(req.params, req.body),
        }).send(res);
    };

    deleteTagById = async (req, res, next) => {
        new SuccessResponse({
            message: "Xóa Tag thành công.",
            metadata: await TagService.deleteTagById(req.params),
        }).send(res);
    };
}

module.exports = new TagController();
