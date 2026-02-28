const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const id = req.params.userId || req.userId;
    if (!id) return res.status(400).json({ message: "Missing user id" });
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const id = req.params.userId || req.userId;
    if (!id) return res.status(400).json({ message: "Missing user id" });
    const allowedFields = [
      "name",
      "location",
      "age",
      "gender",
      "occupation",
      "healthConditions",
      "preferences",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};
