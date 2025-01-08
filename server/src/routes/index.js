"use strict";

const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const keyRoutes = require("./key");
const categoryRoutes = require("./category");
const tagRoutes = require("./tag");
const postRoutes = require("./post");
const commentRoutes = require("./comment");
const authenticateApiKey = require("../middlewares/authenticated-key");

router.use("/v1/api/key", keyRoutes);
router.use(authenticateApiKey);
router.use("/v1/api/auth", authRoutes);
router.use("/v1/api/categories", categoryRoutes);
router.use("/v1/api/tags", tagRoutes);
router.use("/v1/api/posts", postRoutes);
router.use("/v1/api/comments", commentRoutes);

module.exports = router;
