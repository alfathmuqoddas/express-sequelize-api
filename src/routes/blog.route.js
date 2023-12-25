const express = require("express");
const { authenticateJwt } = require("../controllers/auth.controller");
const {
  getListAllBlogs,
  getBlogById,
  getBlogByUserId,
  getBlogByTagId,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require("../controllers/blogPost.controller");
const {
  getCommentByBlogId,
  createCommentByBlogId,
} = require("../controllers/blogComment.controller");

const router = express.Router();

//const { authenticateJwt } = authController;

router.get("/", getListAllBlogs);
router.get("/:blogId", getBlogById);
router.get("/user/:userId", getBlogByUserId);
router.post("/create", authenticateJwt, createBlogPost);
router.put("/:blogId", authenticateJwt, updateBlogPost);
router.delete("/:blogId", authenticateJwt, deleteBlogPost);

//blog comment
router.get("/:blogId/comments", getCommentByBlogId);
router.post("/:blogId/comments", authenticateJwt, createCommentByBlogId);

//blog tag
router.get("/tag/:tagId", getBlogByTagId);

module.exports = router;
