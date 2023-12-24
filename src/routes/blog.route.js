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

//const { authenticateJwt } = authController;

router.get("/", getListAllBlogs);
router.get("/:blogId", getBlogById);
router.post("/create", authController.authenticateJwt, createBlogPost);
router.put("/:blogId", authController.authenticateJwt, updateBlogPost);
router.delete("/:blogId", authController.authenticateJwt, deleteBlogPost);

module.exports = router;
