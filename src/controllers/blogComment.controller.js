const db = require("../models");
const Comment = db.blog_comments;

const getCommentByBlogId = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const commentByBlogId = await Comment.findAll({
      where: { blog_id: blogId },
    });
    if (commentByBlogId.length === 0) {
      res.status(404).json({ message: "No comment were found." });
    } else {
      res.json({ commentByBlogId });
    }
  } catch (error) {
    console.error("Error regarding comment api:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCommentByBlogId = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { text } = req.body;

    const commentByBlogId = await Comment.create({
      text: text,
      user_id: req.user.id,
      blog_id: blogId,
    });
    res.json({
      message: `Comment successfully created for blogId: ${blogId}!`,
    });
  } catch (error) {
    console.error("Error regarding comment api:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user.id;
    const { text } = req.body;
    const updateObject = {};
    if (text !== undefined) {
      updateObject.text = text;
    }
    const [updateCommentById] = await Comment.update(updateObject, {
      where: {
        id: commentId,
        user_id: userId,
      },
    });
    if (updateCommentById === 0) {
      res.status(404).json({
        error: `No comment found for the given userId: ${userId} and commentId: ${commentId}`,
        updateCommentById,
      });
    } else {
      res.json({ message: "Comment successfully updated!", updateCommentById });
    }
  } catch (error) {
    console.error("Error regarding comment api:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user.id;

    const deleteCommentById = await Comment.destroy({
      where: { id: commentId, user_id: userId },
    });
    if (deleteCommentById === 0) {
      res.status(404).json({
        message: `No comment found for the given commentId: ${commentId} and userId: ${userId}.`,
      });
    } else {
      res.json({ error: "Comment successfully deleted!" });
    }
  } catch (error) {
    console.error("Error regarding comment api:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCommentByBlogId,
  createCommentByBlogId,
  updateComment,
  deleteComment,
};
