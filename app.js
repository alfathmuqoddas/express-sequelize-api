const express = require("express");
//require("dotenv").config();
const db = require("./src/models");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const authRoutes = require("./src/routes/auth.route");
const blogRoutes = require("./src/routes/blog.route");
const commentRoutes = require("./src/routes/comment.route");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// const sequelize = new Sequelize({
//   database: process.env.POSTGRES_DATABASE,
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   host: process.env.POSTGRES_HOST,
//   dialect: process.env.DB_DIALECT,
//   dialectOptions: {
//     ssl: {
//       require: true,
//     },
//   },
// });

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
app.use("/comments", commentRoutes);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}.`);
  try {
    //await db.sequelize.sync({ force: true });
    await db.sequelize.sync();
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
