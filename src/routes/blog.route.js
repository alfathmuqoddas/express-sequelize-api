const express = require("express");
const authController = require("../controllers/auth.controller");
const blogPostController = require("../controllers/blogPost.controller");

const router = express.Router();

router.get("/", blogPostController.getListAllBlogs);
router.get("/:id", blogPostController.getBlogById);
router.post(
  "/create",
  authController.authenticateJwt,
  blogPostController.createBlogPost
);
router.put(
  "/:id/update",
  authController.authenticateJwt,
  blogPostController.updateBlogPost
);
router.delete(
  "/:id/delete",
  authController.authenticateJwt,
  blogPostController.deleteBlogPost
);

module.exports = router;
