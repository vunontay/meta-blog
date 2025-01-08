"use strict";

const express = require("express");
const asyncHandler = require("../../middlewares/async-handler");
const { authentication } = require("../../middlewares/auth-util");
const authorize = require("../../middlewares/permission");
const commentController = require("../../controllers/comment-controller");

const router = express.Router();

router.use(asyncHandler(authentication));

router.get(
    "/",
    authorize(["Comment:read"]),
    asyncHandler(commentController.fetchComments)
);
router.post(
    "/",
    authorize(["Comment:create"]),
    asyncHandler(commentController.createComment)
);
router.patch(
    "/",
    authorize(["Comment:update"]),
    asyncHandler(commentController.updateComment)
);
router.delete(
    "/:commentId/:postId",
    authorize(["Comment:delete"]),
    asyncHandler(commentController.deleteComment)
);

module.exports = router;
