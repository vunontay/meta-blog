const { CREATED, SuccessResponse } = require("../middlewares/success-response");
const { PostService } = require("../services/post-service");
class PostController {
    createDraft = async (req, res) => {
        return new CREATED({
            message: "Bài viết nháp đã được tạo.",
            metadata: await PostService.createDraft(req.body),
        }).send(res);
    };

    createPublished = async (req, res) => {
        return new CREATED({
            message: "Bài viết đã được tạo.",
            metadata: await PostService.createPublished(req.body),
        }).send(res);
    };

    publish = async (req, res) => {
        return new SuccessResponse({
            message: "Bài viết đã được xuất bản.",
            metadata: await PostService.publish(req.params),
        }).send(res);
    };

    archive = async (req, res) => {
        return new SuccessResponse({
            message: "Bài viết đã được lưu trữ.",
            metadata: await PostService.archive(req.params),
        }).send(res);
    };

    updatePost = async (req, res) => {
        return new SuccessResponse({
            message: "Bài viết đã cập nhật.",
            metadata: await PostService.updatePost(req.params, req.body),
        }).send(res);
    };

    getAllPost = async (req, res) => {
        return new SuccessResponse({
            message: "Lấy tất cả bài viết thành công.",
            metadata: await PostService.getAllPost(req.query),
        }).send(res);
    };

    getPostDetail = async (req, res) => {
        return new SuccessResponse({
            message: "Lấy bài viết thành công.",
            metadata: await PostService.getPostDetail(req.params),
        }).send(res);
    };

    searchPosts = async (req, res) => {
        return new SuccessResponse({
            message: "Tìm kiếm bài viết thành công.",
            metadata: await PostService.searchPosts(req.query),
        }).send(res);
    };
}

module.exports = new PostController();
