import { User } from '../models/User.js';

// @route   GET /api/users/alumni
// @access  Private
export const getAllAlumni = async (req, res) => {
  try {
    const alumni = await User.find({ role: 'alumni', isActive: true }).select('-password');
    res.status(200).json({ success: true, alumni });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   GET /api/users/students
// @access  Private
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student', isActive: true }).select('-password');
    res.status(200).json({ success: true, students });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const forbiddenFields = ['password', 'role', 'email', 'isActive'];
    forbiddenFields.forEach(f => delete req.body[f]);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    ).select('-password');

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── Admin only ────────────────────────────────────────────────

// @route   GET /api/users
// @access  Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   PUT /api/users/:id/toggle-status
// @access  Admin
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({ success: true, message: `User ${user.isActive ? 'activated' : 'deactivated'}.`, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   DELETE /api/users/:id
// @access  Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    res.status(200).json({ success: true, message: 'User deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};