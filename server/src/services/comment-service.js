"use strict";

const {
    getMaxRightValue,
    createComment,
    getCommentById,
    incrementRightValues,
    incrementLeftValues,
    getChildComments,
    getRootComments,
    deleteComments,
    decrementRightValues,
    decrementLeftValues,
    updateCommentById,
} = require("../repositories/comment-repository");
const createHttpError = require("http-errors");
const { findPostById } = require("../repositories/post-repository");

class CommentService {
    static async addComment({
        postId,
        userId,
        content,
        parentCommentId = null,
    }) {
        // Tạo bình luận mới
        const newComment = await createComment({
            postId,
            userId,
            content,
            parentCommentId,
        });
        let rightValue;

        if (parentCommentId) {
            // Xử lý nếu là bình luận con
            const parentComment = await getCommentById(parentCommentId);
            if (!parentComment)
                throw createHttpError(404, "Không tìm thấy bình luận.");

            rightValue = parentComment.right;

            // Cập nhật left và right cho các node liên quan
            await incrementRightValues(postId, rightValue);
            await incrementLeftValues(postId, rightValue);
        } else {
            // Xử lý nếu là bình luận gốc
            const maxRight = await getMaxRightValue(postId);
            rightValue = maxRight ? maxRight.right + 1 : 1; // Nếu chưa có bình luận nào
        }

        // Gán giá trị left và right cho bình luận mới
        newComment.left = rightValue;
        newComment.right = rightValue + 1;
        await newComment.save();

        return newComment;
    }

    static async fetchComments({
        postId,
        parentCommentId = null,
        limit = 10,
        offset = 0,
    }) {
        if (parentCommentId) {
            const parentComment = await getCommentById(parentCommentId);
            if (!parentComment)
                throw createHttpError(404, "Không tìm thấy bình luận.");

            return await getChildComments(
                postId,
                parentComment.left,
                parentComment.right,
                limit,
                offset
            );
        }

        return await getRootComments(postId, limit, offset);
    }

    static async deleteComments({ commentId, postId }) {
        const post = await findPostById(postId);
        if (!post) throw createHttpError(404, "Không tìm thấy bài đăng.");

        const comment = await getCommentById(commentId);
        if (!comment) throw createHttpError(404, "Không tìm thấy bình luận.");

        const leftValue = comment.left;
        const rightValue = comment.right;
        const width = rightValue - leftValue + 1;

        // Xóa bình luận và các bình luận con
        await deleteComments(postId, leftValue, rightValue);

        // Điều chỉnh giá trị left và right
        await decrementRightValues(postId, rightValue, width);
        await decrementLeftValues(postId, rightValue, width);
    }

    static async updateComment({ commentId, content }) {
        const comment = await getCommentById(commentId);
        if (!comment) {
            throw createHttpError(404, "Không tìm thấy bình luận.");
        }
        const updatedComment = await updateCommentById(commentId, content);

        return {
            comment: updatedComment,
        };
    }
}

module.exports = CommentService;
