"use strict";

const asyncHandler = require("../../middlewares/async-handler");
const express = require("express");
const { authentication } = require("../../middlewares/auth-util");
const authorize = require("../../middlewares/permission");
const tagController = require("../../controllers/tag-controller");
const router = express.Router();

router.use(asyncHandler(authentication));

router.get("/", authorize(["Tag:read"]), asyncHandler(tagController.getAllTag));
router.post(
    "/",
    authorize(["Tag:create"]),
    asyncHandler(tagController.createTag)
);
router.get(
    "/:tagId",
    authorize(["Tag:read"]),
    asyncHandler(tagController.getTagById)
);
router.patch(
    "/:tagId",
    authorize(["Tag:update"]),
    asyncHandler(tagController.updateTagById)
);
router.delete(
    "/:tagId",
    authorize(["Tag:delete"]),
    asyncHandler(tagController.deleteTagById)
);

module.exports = router;
