const express = require("express");

const {
  updateUserProfile,
  addFamilyMember,
  addWeightRecord,
  getUserProfile,
  getWeightHistory,
  getName,
  getWeightSummary,
} = require("../controllers/userController");

const auth = require("../middleware/auth");

const router = express.Router();

router.get("/profile", auth, getUserProfile);

router.put("/profile", auth, updateUserProfile);

router.post("/family", auth, addFamilyMember);

router.post("/family/:id/weight", auth, addWeightRecord);

router.get("/family/:id/history", auth, getWeightHistory);

router.get("/family/:id/name", auth, getName);

router.get("/family/:id/summary", auth, getWeightSummary);

module.exports = router;
