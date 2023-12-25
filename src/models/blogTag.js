module.exports = (sequelize, Sequelize) => {
  const BlogTags = sequelize.define("blog_tags", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  BlogTags.associate = function (models) {
    BlogTags.belongsToMany(models.blog_posts, {
      through: models.blog_post_tags,
    });
  };

  return BlogTags;
};
