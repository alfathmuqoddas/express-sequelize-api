const express = require("express");
const authController = require("../controllers/auth.controller");
const blogPostController = require("../controllers/blogPost.controller");

const router = express.Router();

const {
  getListAllBlogs,
  getBlogById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = blogPostController;

const { authenticateJwt } = authController;

router.get("/", getListAllBlogs);
router.get("/:blogId", getBlogById);
router.post("/create", authenticateJwt, createBlogPost);
router.put("/:blogId/update", authenticateJwt, updateBlogPost);
router.delete("/:blogId/delete", authenticateJwt, deleteBlogPost);

module.exports = router;
