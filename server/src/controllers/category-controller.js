"use strict";

const { CREATED, SuccessResponse } = require("../middlewares/success-response");
const CategoryService = require("../services/category-service");

class AuthController {
    createCategory = async (req, res, next) => {
        new CREATED({
            message: "Tạo danh mục thành công.",
            metadata: await CategoryService.createCategory(req.body),
        }).send(res);
    };

    getAllCategory = async (req, res, next) => {
        new SuccessResponse({
            message: "Lấy danh sách danh mục thành công.",
            metadata: await CategoryService.getAllCategory(req.query),
        }).send(res);
    };

    getCategoryById = async (req, res, next) => {
        new SuccessResponse({
            message: "Lấy thông tin danh mục thành công.",
            metadata: await CategoryService.getCategoryById(req.params),
        }).send(res);
    };

    updateCategoryById = async (req, res, next) => {
        new SuccessResponse({
            message: "Cập nhật danh mục thành công.",
            metadata: await CategoryService.updateCategoryById(
                req.params,
                req.body
            ),
        }).send(res);
    };

    deleteCategoryById = async (req, res, next) => {
        new SuccessResponse({
            message: "Xóa danh mục thành công.",
            metadata: await CategoryService.deleteCategoryById(req.params),
        }).send(res);
    };
}

module.exports = new AuthController();
