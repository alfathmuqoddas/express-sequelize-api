module.exports = (sequelize, Sequelize) => {
  const BlogComments = sequelize.define("blog_comments", {
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  BlogComments.associate = function (models) {
    BlogComments.belongsTo(models.blog_posts);
    BlogComments.belongsTo(models.users);
  };

  return BlogComments;
};
