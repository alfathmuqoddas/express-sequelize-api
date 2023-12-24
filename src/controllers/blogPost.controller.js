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
    res.json({ message: "Blog post successfully created!" });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { title, body } = req.body;

    const updateObject = {};
    if (title !== undefined) {
      updateObject.title = title;
      updateObject.slug = createSlug(title);
    }
    if (body !== undefined) {
      updateObject.body = body;
    }

    const updateBlog = await BlogPosts.update(updateObject, {
      where: { id: blogId },
    });
    if (updateBlog > 0) {
      res.json({ message: "Blog post updated successfully" });
    } else {
      res.status(404).json({ error: "Blog post not found" });
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const deletePost = await BlogPosts.destroy({ where: { id: blogId } });
    if (deletePost > 0) {
      res.json({ message: "Blog post deleted successfully" });
    } else {
      res.status(404).json({ error: "Blog post not found" });
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
