const db = require("../models");
const BlogPosts = db.blog_posts;
const User = db.users;
const { createSlug } = require("../utils/helpers");

const getListAllBlogs = async (req, res) => {
  try {
    const allBlogs = await BlogPosts.findAll({
      include: [{ model: User, attributes: ["id", "username", "email"] }],
    });
    if (allBlogs.length === 0) {
      res.status(404).json({ message: "No blog posts found." });
    } else {
      res.json({ success: true, blogPosts: allBlogs });
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const blogById = await BlogPosts.findAll({
      where: {
        id: blogId,
      },
    });
    if (blogById.length === 0) {
      res.status(404).json({ message: "No blog posts found." });
    } else {
      res.json({ blogById });
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBlogByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const blogByUserId = await BlogPosts.findAll({
      where: {
        user_id: userId,
      },
    });
    if (blogByUserId.length === 0) {
      res.status(404).json({ message: "No blog posts found." });
    } else {
      res.json({ blogByUserId });
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createBlogPost = async (req, res) => {
  const { title, body, user_id } = req.body;

  try {
    const createPost = await BlogPosts.create({
      title: title,
      body: body,
      slug: createSlug(title),
      user_id: user_id,
    });
    res.json({ message: "Blog post successfully created!", user: req.user });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.user.id;
    const { title, body } = req.body;

    const updateObject = {};
    if (title !== undefined) {
      updateObject.title = title;
      updateObject.slug = createSlug(title);
    }
    if (body !== undefined) {
      updateObject.body = body;
    }

    const [updateBlog] = await BlogPosts.update(updateObject, {
      where: { id: blogId, user_id: userId },
    });
    if (updateBlog === 0) {
      res.status(404).json({
        error: `No post found for the given userId: ${userId} and postId: ${blogId}`,
        updateBlog,
      });
    } else {
      res.json({ message: "Blog post successfully updated!", updateBlog });
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.user.id;

    const deletePost = await BlogPosts.destroy({
      where: { id: blogId, user_id: userId },
    });
    if (deletePost === 0) {
      res.status(404).json({
        message: `No post found for the given userId: ${userId} and postId: ${blogId}`,
      });
    } else {
      res.json({ message: "Blog post successfully deleted" });
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getListAllBlogs,
  getBlogById,
  getBlogByUserId,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
