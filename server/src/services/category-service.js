"use strict";

const createHttpError = require("http-errors");
const categoryValidate = require("../validations/category-validate");
const {
    findCategoryBySlug,
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
} = require("../repositories/category-repository");
const {
    generateSlug,
    getInfoData,
    removeUndefinedFields,
} = require("../utils/util");
const { default: mongoose } = require("mongoose");

class CategoryService {
    static async createCategory(payload) {
        const { name, description, parent_id, path, slug } = payload;

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        const { error } = categoryValidate(payload);
        if (error) {
            throw createHttpError.BadRequest(error.details[0].message);
        }

        // Kiểm tra nếu slug không có, tự động tạo slug từ name
        let finalSlug = slug || generateSlug(name);

        // Kiểm tra xem slug đã tồn tại chưa
        const existingCategory = await findCategoryBySlug(finalSlug);
        if (existingCategory) {
            throw createHttpError(
                409,
                `Danh mục với slug "${finalSlug}" đã tồn tại.`
            );
        }

        // Tạo danh mục mới
        const category = await createCategory({
            name,
            description,
            parent_id,
            path,
            slug: finalSlug,
        });

        return {
            category: getInfoData({
                fields: ["name", "description", "parent_id", "path", "slug"],
                object: category,
            }),
        };
    }

    static async getAllCategory(query) {
        const { limit = 50, sort = "ctime", page = 1, filter = {} } = query;

        const categories = await getAllCategory({
            limit,
            sort,
            page,
            filter,
            select: ["name", "description", "slug", "parent_id", "path"],
        });

        return {
            categories,
        };
    }

    static async getCategoryById(params) {
        const { categoryId } = params;

        const category = await getCategoryById(categoryId, [
            "__v",
            "createdAt",
            "updatedAt",
        ]);

        if (!category) {
            throw createHttpError.NotFound("Không tìm thấy danh mục.");
        }

        return {
            category,
        };
    }

    static async updateCategoryById(params, payload) {
        const { categoryId } = params;
        const { name, slug } = payload;

        const cleanedUpdates = removeUndefinedFields(payload);

        let finalSlug = slug || generateSlug(name);

        cleanedUpdates.slug = finalSlug;

        const category = await updateCategoryById(
            categoryId,
            true,
            cleanedUpdates
        );

        if (!category) {
            throw createHttpError.NotFound("Không tìm thấy danh mục.");
        }

        return {
            category,
        };
    }

    static async deleteCategoryById(params) {
        const { categoryId } = params;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            throw createHttpError.BadRequest("ID danh mục không hợp lệ.");
        }

        const deletedCategory = await deleteCategoryById(categoryId);

        if (!deletedCategory) {
            throw createHttpError.NotFound("Không tìm thấy danh mục.");
        }
    }
}

module.exports = CategoryService;
