"use strict";

const keyController = require("../../controllers/key-controller");
const asyncHandler = require("../../middlewares/async-handler");
const express = require("express");
const authorize = require("../../middlewares/permission");
const { authentication } = require("../../middlewares/auth-util");
const router = express.Router();

router.use(asyncHandler(authentication));
router.use(authorize(["APIKey:create"]));
router.post("/create", asyncHandler(keyController.createKey));

module.exports = router;
