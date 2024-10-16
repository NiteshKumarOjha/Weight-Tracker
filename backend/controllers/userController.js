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

    const sortedWeightHistory = familyMember.weightHistory.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    res.json(sortedWeightHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getWeightHistory = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    const familyMember = user.familyMembers.id(req.params.id);

    if (!familyMember)
      return res.status(404).json({ msg: "Family member not found" });

    const sortedWeightHistory = familyMember.weightHistory.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    res.json(sortedWeightHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getName = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    const familyMember = user.familyMembers.id(req.params.id);

    if (!familyMember)
      return res.status(404).json({ msg: "Family member not found" });

    const name = familyMember.name;
    res.json({ name: name });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getWeightSummary = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    const familyMember = user.familyMembers.id(req.params.id);

    if (!familyMember) {
      return res.status(404).json({ msg: "Family member not found" });
    }

    // Map weightHistory to an array of objects with weight and date
    const weightRecords = familyMember.weightHistory.map((record) => ({
      weight: record.weight,
      date: new Date(record.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }), // Format date to "15 October 2024"
    }));

    if (weightRecords.length === 0) {
      return res.json({
        highestWeight: null,
        lowestWeight: null,
        highestWeightDates: [],
        lowestWeightDates: [],
      });
    }

    // Find the highest and lowest weights along with their dates
    let highestWeight = -Infinity;
    let lowestWeight = Infinity;
    const highestWeightDates = [];
    const lowestWeightDates = [];

    weightRecords.forEach((record) => {
      // Check for highest weight
      if (record.weight > highestWeight) {
        highestWeight = record.weight;
        highestWeightDates.length = 0; // Reset the array if a new highest weight is found
        highestWeightDates.push(record.date);
      } else if (record.weight === highestWeight) {
        highestWeightDates.push(record.date); // Add date if it's the same as the highest weight
      }

      // Check for lowest weight
      if (record.weight < lowestWeight) {
        lowestWeight = record.weight;
        lowestWeightDates.length = 0; // Reset the array if a new lowest weight is found
        lowestWeightDates.push(record.date);
      } else if (record.weight === lowestWeight) {
        lowestWeightDates.push(record.date); // Add date if it's the same as the lowest weight
      }
    });

    res.json({
      highestWeight,
      highestWeightDates,
      lowestWeight,
      lowestWeightDates,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
