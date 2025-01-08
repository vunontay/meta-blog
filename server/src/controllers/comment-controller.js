"use strict";

const { CREATED, SuccessResponse } = require("../middlewares/success-response");
const CommentService = require("../services/comment-service");

class CommentController {
    createComment = async (req, res) => {
        return new CREATED({
            message: "Bình luận thành công",
            metadata: await CommentService.addComment(req.body),
        }).send(res);
    };

    fetchComments = async (req, res) => {
        return new SuccessResponse({
            message: "Lấy bình luận thành công",
            metadata: await CommentService.fetchComments(req.query),
        }).send(res);
    };

    deleteComment = async (req, res) => {
        return new SuccessResponse({
            message: "Xóa bình luận thành công",
            metadata: await CommentService.deleteComments(req.params),
        }).send(res);
    };

    updateComment = async (req, res) => {
        return new SuccessResponse({
            message: "Cập nhật bình luận thành công",
            metadata: await CommentService.updateComment(req.body),
        }).send(res);
    };
}

module.exports = new CommentController();
