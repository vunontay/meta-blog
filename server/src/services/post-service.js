"use strict";

const createHttpError = require("http-errors");
const {
    findPostById,
    createPost,
    updatePostById,
    archivePostById,
    findPostBySlug,
    findPostByTitleExceptId,
    countAllPosts,
    findPostsPaginated,
    searchPosts,
    countAllPostsSearch,
} = require("../repositories/post-repository");
const { generateSlug, getInfoData } = require("../utils/util");
const { postValidate } = require("../validations/post-validate");
const { findUserById } = require("../repositories/auth-repository");
const { findCategoriesByIds } = require("../repositories/category-repository");
const { findTagsByIds } = require("../repositories/tag-repository");
const { initRedis } = require("../libs/init-redis");

class PostFactory {
    static create(data, status = "draft") {
        return {
            ...data,
            slug: generateSlug(data.title),
            status,
            version: 1,
        };
    }
}

class PostService {
    static async invalidatePostCache(postId = null) {
        const redisClient = await initRedis();

        // Xóa cache tổng số bài viết
        await redisClient.del("posts:total_count");

        // Xóa cache danh sách bài viết theo trang
        const keys = await redisClient.keys("posts:page:*");
        if (keys.length > 0) {
            await Promise.all(keys.map((key) => redisClient.del(key)));
        }

        // Xóa cache chi tiết bài viết (nếu có postId)
        if (postId) {
            await redisClient.del(`post:detail:${postId}`);
        }
    }

    static async createPostWithStatus(payload, status) {
        const { error } = postValidate(payload);
        if (error) {
            throw createHttpError.BadRequest(error.details[0].message);
        }

        const author = await findUserById(payload.author_id);
        if (!author) {
            throw createHttpError.BadRequest("Tác giả không tồn tại.");
        }

        if (author.status !== "active") {
            throw createHttpError.BadRequest(
                "Tác giả không có quyền đăng bài viết."
            );
        }

        const validCategories = await findCategoriesByIds(
            payload.category_ids || []
        );
        if (
            payload.category_ids &&
            validCategories.length !== payload.category_ids.length
        ) {
            throw createHttpError.BadRequest("Một số danh mục không tồn tại.");
        }

        const validTags = await findTagsByIds(payload.tag_ids || []);
        if (payload.tag_ids && validTags.length !== payload.tag_ids.length) {
            throw createHttpError.BadRequest("Một số thẻ không tồn tại.");
        }

        let slug = payload.slug || generateSlug(payload.title);
        const existingPost = await findPostBySlug(slug);
        if (existingPost) {
            throw createHttpError(
                409,
                `Bài viết với slug "${slug}" đã tồn tại.`
            );
        }

        const post = PostFactory.create(payload, status);
        const createdPost = await createPost(post);

        // Invalidate cache sau khi tạo bài viết
        await this.invalidatePostCache();

        return {
            post: getInfoData({
                fields: [
                    "title",
                    "slug",
                    "content",
                    "author_name",
                    "status",
                    "version",
                ],
                object: createdPost,
            }),
        };
    }

    static async createDraft(payload) {
        return await PostService.createPostWithStatus(payload, "draft");
    }

    static async createPublished(payload) {
        if (!payload.category_ids || payload.category_ids.length === 0) {
            throw createHttpError(400, "Bài viết phải có ít nhất một danh mục");
        }
        return await PostService.createPostWithStatus(payload, "published");
    }

    static async publish(params) {
        const { postId } = params;
        const post = await findPostById(postId);
        if (!post) {
            throw createHttpError(404, "Không tìm thấy bài viết");
        }

        if (post.status === "published") {
            throw createHttpError(400, "Bài viết đã được xuất bản");
        }

        if (post.status === "archived") {
            throw createHttpError(
                400,
                "Bài viết đã bị lưu trữ và không thể xuất bản"
            );
        }

        if (!post.category_ids || post.category_ids.length === 0) {
            throw createHttpError(400, "Bài viết phải có ít nhất một danh mục");
        }

        post.status = "published";
        await updatePostById(postId, { status: "published" });

        // Invalidate cache sau khi xuất bản
        await this.invalidatePostCache(postId);

        return {
            post: {
                title: post.title,
                slug: post.slug,
                content: post.content,
                author_name: post.author_name,
                status: post.status,
                version: post.version,
            },
        };
    }

    static async archive(params) {
        const { postId } = params;
        const post = await findPostById(postId);
        if (!post) {
            throw createHttpError(404, "Không tìm thấy bài viết");
        }

        if (post.status === "archived") {
            throw createHttpError(400, "Bài viết đã bị lưu trữ");
        }

        post.status = "archived";
        await updatePostById(postId, { status: "archived" });

        // Invalidate cache sau khi lưu trữ
        await this.invalidatePostCache(postId);

        return {
            post: {
                title: post.title,
                slug: post.slug,
                content: post.content,
                author_name: post.author_name,
                status: post.status,
                version: post.version,
            },
        };
    }

    static async updatePost(params, payload) {
        const { postId } = params;
        const post = await findPostById(postId);
        if (!post) {
            throw createHttpError(404, "Không tìm thấy bài viết");
        }

        const { error } = postValidate(payload);
        if (error) {
            throw createHttpError.BadRequest(error.details[0].message);
        }

        const validCategories = await findCategoriesByIds(
            payload.category_ids || []
        );
        if (
            payload.category_ids &&
            validCategories.length !== payload.category_ids.length
        ) {
            throw createHttpError.BadRequest("Một số danh mục không tồn tại.");
        }

        const validTags = await findTagsByIds(payload.tag_ids || []);
        if (payload.tag_ids && validTags.length !== payload.tag_ids.length) {
            throw createHttpError.BadRequest("Một số thẻ không tồn tại.");
        }

        if (payload.title && payload.title !== post.title) {
            const existingPost = await findPostByTitleExceptId(
                payload.title,
                postId
            );
            if (existingPost) {
                throw createHttpError.BadRequest("Tiêu đề bài viết đã tồn tại");
            }
            payload.slug = generateSlug(payload.title);
        }

        const updatePayload = {
            ...payload,
            version: (post.version || 1) + 1,
        };

        const updatedPost = await updatePostById(postId, updatePayload);

        // Invalidate cache sau khi cập nhật
        await this.invalidatePostCache(postId);

        return {
            post: getInfoData({
                fields: [
                    "title",
                    "slug",
                    "content",
                    "author_name",
                    "status",
                    "version",
                ],
                object: updatedPost,
            }),
        };
    }

    static async getAllPost(query) {
        const redisClient = await initRedis();

        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const cacheKey = `posts:page:${page}:limit:${limit}`;

        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const [posts, total_posts] = await Promise.all([
            findPostsPaginated({
                page,
                limit,
                select: [
                    "title",
                    "slug",
                    "content",
                    "author_name",
                    "status",
                    "version",
                ],
            }),
            countAllPosts(),
        ]);
        const total_pages = Math.ceil(total_posts / limit);

        const result = {
            data: posts,
            meta: {
                current_page: page,
                total_pages,
                total_posts,
                limit,
            },
        };

        await redisClient.set(cacheKey, JSON.stringify(result), { EX: 60 });

        return result;
    }

    static async getPostDetail(params) {
        const { postId } = params;
        const redisClient = await initRedis();
        const cacheKey = `post:detail:${postId}`;

        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const post = await findPostById(postId);
        if (!post) {
            throw createHttpError(404, "Không tìm thấy bài viết");
        }
        const postDetail = getInfoData({
            fields: [
                "title",
                "slug",
                "content",
                "author_name",
                "category_ids",
                "tag_ids",
                "status",
                "version",
                "createdAt",
                "updatedAt",
            ],
            object: post,
        });

        await redisClient.set(cacheKey, JSON.stringify(postDetail), {
            EX: 300,
        });

        return postDetail;
    }

    static async searchPosts(query) {
        const keyword = query.keyword || "";
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;

        const [posts, total_posts] = await Promise.all([
            searchPosts({
                keyword,
                page,
                limit,
                select: [
                    "title",
                    "slug",
                    "content",
                    "author_name",
                    "status",
                    "version",
                ],
            }),
            countAllPostsSearch({ keyword }),
        ]);

        const total_pages = Math.ceil(total_posts / limit);

        return {
            data: posts,
            meta: {
                keyword,
                current_page: page,
                total_pages,
                total_posts,
                limit,
            },
        };
    }
}

module.exports = {
    PostFactory,
    PostService,
};
