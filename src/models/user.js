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
    Users.hasMany(models.blog_comments);
    Users.hasMany(models.blog_posts);
  };

  return Users;
};
