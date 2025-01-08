"use strict";

const createHttpError = require("http-errors");
const {
    findTagBySlug,
    createTag,
    getAllTag,
    getTagById,
    updateTagById,
    deleteTagById,
} = require("../repositories/tag-repository");
const {
    generateSlug,
    getInfoData,
    removeUndefinedFields,
} = require("../utils/util");
const { tagValidate } = require("../validations/tag-validate");
const { default: mongoose } = require("mongoose");

class TagService {
    static async createTag(payload) {
        const { name, slug, description } = payload;

        const { error } = tagValidate(payload);

        if (error) {
            throw createHttpError.BadRequest(error.details[0].message);
        }

        let finalSlug = slug || generateSlug(name);

        const existingTag = await findTagBySlug(finalSlug);
        if (existingTag) {
            throw createHttpError(
                409,
                `Tag với slug "${finalSlug}" đã tồn tại.`
            );
        }

        const tag = await createTag({
            name,
            description,
            slug: finalSlug,
        });

        return {
            tag: getInfoData({
                fields: ["name", "description", "slug"],
                object: tag,
            }),
        };
    }

    static async getAllTag(query) {
        const { limit = 50, sort = "ctime", page = 1, filter = {} } = query;

        const tags = await getAllTag({
            limit,
            sort,
            page,
            filter,
            select: ["name", "description", "slug"],
        });

        return {
            tags,
        };
    }

    static async getTagById(params) {
        const { tagId } = params;

        const tag = await getTagById(tagId, ["__v", "createdAt", "updatedAt"]);

        if (!tag) {
            throw createHttpError.NotFound("Không tìm thấy tag.");
        }

        return {
            tag,
        };
    }

    static async updateTagById(params, payload) {
        const { tagId } = params;
        const { name, slug } = payload;

        const cleanedUpdates = removeUndefinedFields(payload);

        let finalSlug = slug || generateSlug(name);

        cleanedUpdates.slug = finalSlug;

        const tag = await updateTagById(tagId, true, cleanedUpdates);

        if (!tag) {
            throw createHttpError.NotFound("Không tìm thấy danh mục.");
        }

        return {
            tag,
        };
    }

    static async deleteTagById(params) {
        const { tagId } = params;

        if (!mongoose.Types.ObjectId.isValid(tagId)) {
            throw createHttpError.BadRequest("ID Tag không hợp lệ.");
        }

        const deletedTag = await deleteTagById(tagId);

        if (!deletedTag) {
            throw createHttpError.NotFound("Không tìm thấy Tag.");
        }
    }
}

module.exports = TagService;
