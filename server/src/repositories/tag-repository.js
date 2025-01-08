const {
    removeUndefinedFields,
    getSelectData,
    getUnSelectData,
    convertToObjectIdMongodb,
} = require("../utils/util");
const tagModel = require("../models/tag-model");
class TagRepository {
    static async findTagBySlug(slug) {
        return await tagModel.findOne({ slug }).lean().exec();
    }

    static async createTag(data) {
        const cleanedData = removeUndefinedFields(data);
        const tag = new tagModel(cleanedData);
        return await tag.save();
    }

    static async getAllTag({
        limit = 50,
        sort = "ctime",
        page = 1,
        filter = {},
        select = [],
    }) {
        const skip = (page - 1) * limit;
        const sortBy = sort === "ctime" ? { createdAt: -1 } : { updatedAt: -1 };

        if (typeof filter === "string") {
            filter = {
                $or: [
                    { name: { $regex: filter, $options: "i" } },
                    { slug: { $regex: filter, $options: "i" } },
                ],
            };
        }

        const tags = await tagModel
            .find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(getSelectData(select))
            .lean();

        return tags;
    }

    static async getTagById(tagId, unSelect = []) {
        return await tagModel
            .findById({ _id: convertToObjectIdMongodb(tagId) })
            .select(getUnSelectData(unSelect))
            .lean()
            .exec();
    }

    static async updateTagById(tagId, isNew = true, data) {
        return await tagModel
            .findByIdAndUpdate(
                { _id: convertToObjectIdMongodb(tagId) },
                { $set: data },
                { new: isNew }
            )
            .lean()
            .exec();
    }

    static async deleteTagById(tagId) {
        return await tagModel.findByIdAndDelete({
            _id: convertToObjectIdMongodb(tagId),
        });
    }

    static async findTagsByIds(tagIds, fields = "name slug") {
        const validIds = tagIds.filter((id) => convertToObjectIdMongodb(id));

        if (validIds.length === 0) {
            return [];
        }
        return await tagModel
            .find({ _id: { $in: validIds } })
            .select(fields)
            .lean();
    }
}

module.exports = TagRepository;
