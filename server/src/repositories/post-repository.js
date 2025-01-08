// repositories/post-repository.js
const { initRedis } = require("../libs/init-redis");
const postModel = require("../models/post-model");
const { convertToObjectIdMongodb, getSelectData } = require("../utils/util");

class PostRepository {
    // Tìm bài viết theo ID
    static async findPostById(postId) {
        return await postModel.findById({
            _id: convertToObjectIdMongodb(postId),
        });
    }

    static async findPostBySlug(slug) {
        return await postModel.findOne({ slug }).lean().exec();
    }

    // Tạo bài viết mới
    static async createPost(data) {
        const post = new postModel(data);
        return await post.save();
    }

    // Cập nhật bài viết theo ID
    static async updatePostById(postId, data) {
        return await postModel.findByIdAndUpdate(
            { _id: convertToObjectIdMongodb(postId) },
            data,
            { new: true }
        );
    }

    // Lưu bài viết đã được archive
    static async archivePostById(postId, deletedAt) {
        return await postModel.findByIdAndUpdate(
            { _id: convertToObjectIdMongodb(postId) },
            { status: "archived", deleted_at: deletedAt },
            { new: true }
        );
    }

    static async findPostByTitleExceptId(title, postId) {
        return await postModel
            .findOne({
                title,
                _id: { $ne: convertToObjectIdMongodb(postId) },
            })
            .lean();
    }

    static async findPostsPaginated({ page = 1, limit = 10, select = [] }) {
        return await postModel
            .find({})
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .select(getSelectData(select))
            .lean();
    }

    static async countAllPosts() {
        const redisClient = await initRedis();
        const cacheKey = "posts:total_count";

        // Kiểm tra cache
        const cachedCount = await redisClient.get(cacheKey);
        if (cachedCount) {
            return parseInt(cachedCount, 10); // Trả về cache nếu có
        }

        // Truy vấn cơ sở dữ liệu nếu không có cache
        const totalPosts = await postModel.countDocuments();

        // Lưu vào cache với TTL là 60 giây
        await redisClient.set(cacheKey, totalPosts.toString(), { EX: 60 });

        return totalPosts;
    }

    static async searchPosts({ keyword, page, limit, select = [] }) {
        const skip = (page - 1) * limit;

        const query = {
            $and: [{ status: "published" }, { $text: { $search: keyword } }],
        };

        return await postModel
            .find(query)
            .select({ ...getSelectData(select), score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } })
            .skip(skip)
            .limit(limit)
            .lean();
    }

    static async countAllPostsSearch({ keyword }) {
        const query = {
            $and: [{ status: "published" }, { $text: { $search: keyword } }],
        };
        return await postModel.countDocuments(query);
    }
}

module.exports = PostRepository;
