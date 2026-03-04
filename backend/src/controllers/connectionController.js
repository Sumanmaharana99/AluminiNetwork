import { Connection } from '../models/Connection.js';
import { User } from '../models/User.js';

// @route   POST /api/connections/request/:userId
// @access  Private
export const sendRequest = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: "You can't connect with yourself." });
    }

    const existing = await Connection.findOne({
      $or: [
        { requester: req.user._id, recipient: userId },
        { requester: userId, recipient: req.user._id },
      ],
    });

    if (existing) {
      return res.status(409).json({ success: false, message: 'Request already exists.' });
    }

    const connection = await Connection.create({
      requester: req.user._id,
      recipient: userId,
    });

    res.status(201).json({ success: true, connection });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   PUT /api/connections/accept/:connectionId
// @access  Private
export const acceptRequest = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.connectionId);
    if (!connection) return res.status(404).json({ success: false, message: 'Request not found.' });

    if (connection.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    connection.status = 'accepted';
    await connection.save();

    // Add each other to connections list
    await User.findByIdAndUpdate(connection.requester, { $addToSet: { connections: connection.recipient } });
    await User.findByIdAndUpdate(connection.recipient, { $addToSet: { connections: connection.requester } });

    res.status(200).json({ success: true, message: 'Connection accepted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   PUT /api/connections/reject/:connectionId
// @access  Private
export const rejectRequest = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.connectionId);
    if (!connection) return res.status(404).json({ success: false, message: 'Request not found.' });

    connection.status = 'rejected';
    await connection.save();

    res.status(200).json({ success: true, message: 'Connection rejected.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   GET /api/connections/pending
// @access  Private
export const getPendingRequests = async (req, res) => {
  try {
    const requests = await Connection.find({ recipient: req.user._id, status: 'pending' })
      .populate('requester', 'name profilePicture role');
    res.status(200).json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   GET /api/connections
// @access  Private
export const getMyConnections = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('connections', 'name profilePicture role company major');
    res.status(200).json({ success: true, connections: user.connections });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};