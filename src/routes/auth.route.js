const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/protected", authController.authenticateJwt, (req, res) => {
  res.json({
    message: "You have access to this protected route!",
    user: req.user,
  });
});

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
