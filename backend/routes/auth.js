const express = require("express");
const { signUp, login } = require("../controllers/authController");
const router = express.Router();
const auth = require("../middleware/auth"); // Your existing auth middleware

// POST api/auth/signup
router.post("/signup", signUp);

// POST api/auth/login
router.post("/login", login);

router.get("/verify-token", auth, (req, res) => {
  res.status(200).json({ msg: "Token is valid" });
});

module.exports = router;
