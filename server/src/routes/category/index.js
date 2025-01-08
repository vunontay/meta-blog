"use strict";

const asyncHandler = require("../../middlewares/async-handler");
const express = require("express");
const { authentication } = require("../../middlewares/auth-util");
const categoryController = require("../../controllers/category-controller");
const authorize = require("../../middlewares/permission");
const router = express.Router();

router.use(asyncHandler(authentication));

router.get(
    "/",
    authorize(["Category:read"]),
    asyncHandler(categoryController.getAllCategory)
);
router.post(
    "/",
    authorize(["Category:create"]),
    asyncHandler(categoryController.createCategory)
);
router.get(
    "/:categoryId",
    authorize(["Category:read"]),
    asyncHandler(categoryController.getCategoryById)
);
router.patch(
    "/:categoryId",
    authorize(["Category:update"]),
    asyncHandler(categoryController.updateCategoryById)
);
router.delete(
    "/:categoryId",
    authorize(["Category:delete"]),
    asyncHandler(categoryController.deleteCategoryById)
);

module.exports = router;
