const db = require("../models");
const BlogPosts = db.blog_posts;
const helpers = require("../utils/helpers");

const { createSlug } = helpers;

const getListAllBlogs = async (req, res) => {
  try {
    const allBlogs = await BlogPosts.findAll();
    if (allBlogs.length === 0) {
      res.status(404).json({ message: "No blog posts found." });
    } else {
      res.json({ allBlogs });
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
  } catch (error) {}
};

const createBlogPost = async (req, res) => {
  try {
    const { title, body } = req.body;

    const createPost = await BlogPosts.create({
      title: title,
      body: body,
      slug: createSlug(title),
    });
    res.json({ message: "Blog post successfully created!", createPost });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { title, body } = req.body;

    const updateBlog = await BlogPosts.update(
      {
        title: title,
        body: body,
        slug: createSlug(title),
      },
      { where: { id: blogId } }
    );
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

    const deletePost = await BlogPosts.delete({ where: { id: blogId } });
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
