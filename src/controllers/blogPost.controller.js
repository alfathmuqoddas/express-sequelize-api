const db = require("../models");
const BlogPosts = db.blog_posts;
const User = db.users;
const BlogTags = db.blog_tags;
const BlogPostTags = db.blog_post_tags;
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

const getBlogByTagId = async (req, res) => {
  try {
    const tagId = req.params.tagId;
    const blogByTag = await BlogPosts.findAll({
      include: [
        {
          model: BlogTags,
          through: { model: BlogPostTags, where: { tagId: tagId } },
        },
      ],
    });
    if (blogByTag.length === 0) {
      res
        .status(404)
        .json({ message: `No blog posts with tag id: ${tagId} found.` });
    } else {
      res.json({ success: true, blogByTag: blogByTag });
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createBlogPost = async (req, res) => {
  const { title, body, tagIds } = req.body;
  const userId = req.user.id;

  try {
    const createPost = await BlogPosts.create({
      title: title,
      body: body,
      slug: createSlug(title),
      user_id: userId,
    });

    // Add tags to the blog post
    if (tagIds && tagIds.length) {
      const tags = await Tag.findAll({ where: { id: tagIds } });
      await createPost.addTags(tags);
    }

    res.json({
      message: "Blog post successfully created!",
      user: req.user,
      createPost,
    });
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
  getBlogByTagId,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
