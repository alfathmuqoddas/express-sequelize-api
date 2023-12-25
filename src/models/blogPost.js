module.exports = (sequelize, Sequelize) => {
  const BlogPosts = sequelize.define("blog_posts", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.INTEGER,
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  BlogPosts.associate = function (models) {
    BlogPosts.hasMany(models.blog_comments, {
      onDelete: "CASCADE",
      foreignKey: "blog_id",
    });
    BlogPosts.belongsTo(models.users, { foreignKey: "user_id" });
    BlogPosts.belongsToMany(models.blog_tags, {
      through: models.blog_post_tags,
    });
  };

  return BlogPosts;
};
