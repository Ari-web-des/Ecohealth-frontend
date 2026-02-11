const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const id = req.params.userId || req.userId;
    if (!id) return res.status(400).json({ message: 'Missing user id' });
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const id = req.params.userId || req.userId;
    if (!id) return res.status(400).json({ message: 'Missing user id' });
    const updates = req.body;
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};
