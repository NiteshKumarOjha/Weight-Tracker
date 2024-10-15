const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  const { name, email, bio, password } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (bio) user.bio = bio;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Add a Family Member
exports.addFamilyMember = async (req, res) => {
  const { name, relation } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (user.familyMembers.length >= 4) {
      return res
        .status(400)
        .json({ msg: "You can only add up to 4 family members" });
    }

    user.familyMembers.push({ name, relation });
    await user.save();

    res.json(user.familyMembers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Add Weight Record for Family Member
exports.addWeightRecord = async (req, res) => {
  const { weight, date } = req.body;

  try {
    let user = await User.findById(req.user.id);

    const familyMember = user.familyMembers.id(req.params.id);
    if (!familyMember)
      return res.status(404).json({ msg: "Family member not found" });

    familyMember.weightHistory.push({ weight, date });
    await user.save();

    res.json(familyMember.weightHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
