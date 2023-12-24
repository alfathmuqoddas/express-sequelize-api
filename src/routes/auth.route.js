const express = require("express");
const {
  authenticateJwt,
  register,
  login,
} = require("../controllers/auth.controller");

const router = express.Router();

router.get("/protected", authenticateJwt, (req, res) => {
  res.json({
    message: "You have access to this protected route!",
    user: req.user,
  });
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
