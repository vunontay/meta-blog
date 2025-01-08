"use strict";

const categoryModel = require("../models/category-model");
const {
    removeUndefinedFields,
    getSelectData,
    getUnSelectData,
    convertToObjectIdMongodb,
} = require("../utils/util");

class CategoryRepository {
    static async createCategory(data) {
        const cleanedData = removeUndefinedFields(data);
        const category = new categoryModel(cleanedData);
        return await category.save();
    }

    static async findCategoriesByIds(categoryIds, fields = "name slug") {
        const validIds = categoryIds.filter((id) =>
            convertToObjectIdMongodb(id)
        );

        if (validIds.length === 0) {
            return [];
        }

        return await categoryModel
            .find({ _id: { $in: validIds } })
            .select(fields)
            .lean();
    }

    static async findCategoryBySlug(slug) {
        return await categoryModel.findOne({ slug }).lean().exec();
    }

    static async getAllCategory({
        limit = 50,
        sort = "ctime",
        page = 1,
        filter = {},
        select = [],
    }) {
        const skip = (page - 1) * limit;
        const sortBy = sort === "ctime" ? { createdAt: -1 } : { updatedAt: -1 };

        const categories = await categoryModel
            .find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(getSelectData(select))
            .lean();

        return categories;
    }

    static async getCategoryById(categoryId, unSelect = []) {
        return await categoryModel
            .findById({ _id: convertToObjectIdMongodb(categoryId) })
            .select(getUnSelectData(unSelect))
            .lean()
            .exec();
    }

    static async updateCategoryById(categoryId, isNew = true, data) {
        return await categoryModel
            .findByIdAndUpdate(
                { _id: convertToObjectIdMongodb(categoryId) },
                { $set: data },
                { new: isNew }
            )
            .lean()
            .exec();
    }

    static async deleteCategoryById(categoryId) {
        return await categoryModel.findByIdAndDelete({
            _id: convertToObjectIdMongodb(categoryId),
        });
    }
}

module.exports = CategoryRepository;
