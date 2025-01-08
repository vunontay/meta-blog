"use strict";

const AuthController = require("../../controllers/auth-controller");
const asyncHandler = require("../../middlewares/async-handler");
const express = require("express");
const { authentication } = require("../../middlewares/auth-util");
const router = express.Router();

router.post("/login", asyncHandler(AuthController.login));
router.post("/register", asyncHandler(AuthController.register));
router.post("/refresh-token", asyncHandler(AuthController.refreshToken));
router.use(asyncHandler(authentication));
router.delete("/logout", asyncHandler(AuthController.logout));

module.exports = router;
