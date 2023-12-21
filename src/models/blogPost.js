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
    user_id: {
      type: Sequelize.INTEGER,
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
  });

  BlogPosts.associate = function (models) {
    BlogPosts.hasMany(models.blog_comments, {
      onDelete: "CASCADE",
    });
    BlogPosts.belongsTo(models.users);
  };

  return BlogPosts;
};
