module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  Users.associate = function (models) {
    Users.hasMany(models.blog_comments, { foreignKey: "user_id" });
    Users.hasMany(models.blog_posts, { foreignKey: "user_id" });
  };

  return Users;
};
