const express = require("express");
const { signUp, login } = require("../controllers/authController");
const router = express.Router();

// POST api/auth/signup
router.post("/signup", signUp);

// POST api/auth/login
router.post("/login", login);

module.exports = router;
