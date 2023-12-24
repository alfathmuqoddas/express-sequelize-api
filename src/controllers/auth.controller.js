const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("../models");
const Users = db.users;

const secretKey = process.env.SECRET_KEY;

const authenticateJwt = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await Users.findOne({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already in use" });
    }

    const newUser = await Users.create({
      username: username.toLowerCase(),
      email: email,
      password: bcrypt.hashSync(password, 8),
    });

    res.json({
      message: "User was registered successfully!",
    });
  } catch (error) {
    console.log("Error registering user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    var passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: user.id }, secretKey, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 3600, // 24 hours
    });

    res.status(200).send({
      success: true,
      accessToken: token,
    });
  } catch (error) {
    console.log("Login error: ", error);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  authenticateJwt,
  login,
  register,
};
