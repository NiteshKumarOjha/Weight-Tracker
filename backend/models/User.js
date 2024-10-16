const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    familyMembers: [
      {
        name: String,
        relation: String,
        weightHistory: [
          {
            weight: Number,
            date: Date,
          },
        ],
        highestWeight: Number,
        lowestWeight: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
