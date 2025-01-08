"use strict";

const commentModel = require("../models/comment-model");
const { convertToObjectIdMongodb } = require("../utils/util");

class CommentRepository {
    static async createComment({ postId, userId, content, parentCommentId }) {
        const comment = new commentModel({
            post_id: postId,
            user_id: userId,
            content,
            parent_id: parentCommentId,
        });

        return await comment.save();
    }

    static async getMaxRightValue(postId) {
        return await commentModel
            .findOne({ post_id: convertToObjectIdMongodb(postId) })
            .sort({ right: -1 }) // Lấy giá trị right lớn nhất
            .exec();
    }

    static async getCommentById(commentId) {
        return await commentModel.findById(convertToObjectIdMongodb(commentId));
    }

    static async incrementRightValues(postId, rightValue) {
        return await commentModel.updateMany(
            {
                post_id: convertToObjectIdMongodb(postId),
                right: { $gte: rightValue },
            },
            { $inc: { right: 2 } } // Tăng thêm 2
        );
    }

    static async incrementLeftValues(postId, rightValue) {
        return await commentModel.updateMany(
            {
                post_id: convertToObjectIdMongodb(postId),
                left: { $gt: rightValue },
            },
            { $inc: { left: 2 } } // Tăng thêm 2
        );
    }

    static async getChildComments(postId, left, right, limit, offset) {
        return await commentModel
            .find({
                post_id: convertToObjectIdMongodb(postId),
                left: { $gt: left },
                right: { $lte: right },
            })
            .select({ left: 1, right: 1, content: 1, parent_id: 1 })
            .sort({ left: 1 })
            .skip(offset)
            .limit(limit);
    }

    static async getRootComments(postId, limit, offset) {
        return await commentModel
            .find({
                post_id: convertToObjectIdMongodb(postId),
                parent_id: null,
            })
            .select({ left: 1, right: 1, content: 1, parent_id: 1 })
            .sort({ left: 1 })
            .skip(offset)
            .limit(limit);
    }

    static async deleteComments(postId, leftValue, rightValue) {
        return await commentModel.deleteMany({
            post_id: convertToObjectIdMongodb(postId),
            left: { $gte: leftValue, $lte: rightValue },
        });
    }

    static async decrementRightValues(postId, rightValue, width) {
        return await commentModel.updateMany(
            {
                post_id: convertToObjectIdMongodb(postId),
                right: { $gt: rightValue },
            },
            {
                $inc: { right: -width },
            }
        );
    }

    static async decrementLeftValues(postId, rightValue, width) {
        return await commentModel.updateMany(
            {
                post_id: convertToObjectIdMongodb(postId),
                left: { $gt: rightValue },
            },
            {
                $inc: { left: -width },
            }
        );
    }

    static async updateCommentById(commentId, content) {
        return await commentModel.findByIdAndUpdate(
            commentId,
            { content },
            { new: true }
        );
    }
}

module.exports = CommentRepository;
