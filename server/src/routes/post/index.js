"use strict";

const express = require("express");
const asyncHandler = require("../../middlewares/async-handler");
const { authentication } = require("../../middlewares/auth-util");
const authorize = require("../../middlewares/permission");
const postController = require("../../controllers/post-controller");

const router = express.Router();

router.use(asyncHandler(authentication));

router.post(
    "/draft",
    authorize(["Post:create"]),
    asyncHandler(postController.createDraft)
);
router.post(
    "/published",
    authorize(["Post:create"]),
    asyncHandler(postController.createPublished)
);
router.patch(
    "/:postId/publish",
    authorize(["Post:publish"]),
    asyncHandler(postController.publish)
);
router.patch(
    "/:postId/archive",
    authorize(["Post:archive"]),
    asyncHandler(postController.archive)
);
router.patch(
    "/:postId/update",
    authorize(["Post:update"]),
    asyncHandler(postController.updatePost)
);
router.get(
    "/",
    authorize(["Post:read"]),
    asyncHandler(postController.getAllPost)
);
router.get(
    "/search",
    authorize(["Post:read"]),
    asyncHandler(postController.searchPosts)
);
router.get(
    "/:postId",
    authorize(["Post:read"]),
    asyncHandler(postController.getPostDetail)
);

module.exports = router;
