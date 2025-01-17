"use strict";

const asyncHandler = require("../../middlewares/async-handler");
const express = require("express");
const { authentication } = require("../../middlewares/auth-util");
const authorize = require("../../middlewares/permission");
const userController = require("../../controllers/user-controller");

const router = express.Router();

router.use(asyncHandler(authentication));

router.get(
    "/:userId",
    authorize(["User:read"]),
    asyncHandler(userController.getUserInfo)
);

module.exports = router;
