module.exports = (sequelize, Sequelize) => {
  const BlogPostTags = sequelize.define("blog_post_tags", {});
  return BlogPostTags;
};
