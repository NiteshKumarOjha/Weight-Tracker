const express = require("express");

const {
  updateUserProfile,
  addFamilyMember,
  addWeightRecord,
  getUserProfile,
} = require("../controllers/userController");

const auth = require("../middleware/auth");

const router = express.Router();

router.get("/profile", auth, getUserProfile);

router.put("/profile", auth, updateUserProfile);

router.post("/family", auth, addFamilyMember);

router.post("/family/:id/weight", auth, addWeightRecord);

module.exports = router;
