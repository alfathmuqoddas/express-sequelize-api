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
    blog_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  BlogComments.associate = function (models) {
    BlogComments.belongsTo(models.blog_posts, { foreignKey: "blog_id" });
    BlogComments.belongsTo(models.users, { foreignKey: "user_id" });
  };

  return BlogComments;
};
