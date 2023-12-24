const express = require("express");
const { authenticateJwt } = require("../controllers/auth.controller");
const {
  updateComment,
  deleteComment,
} = require("../controllers/blogComment.controller");

const router = express.Router();

//const { authenticateJwt } = authController;

//getCommentByBlogId and createCommentByBlogId is in blog.route
router.put("/:commentId", authenticateJwt, updateComment);
router.delete("/:commentId", authenticateJwt, deleteComment);

module.exports = router;
