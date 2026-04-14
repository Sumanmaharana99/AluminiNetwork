import { Connection } from '../models/Connection.js';
import { User } from '../models/User.js';

export const sendRequest = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a connection request to yourself."
      });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }
    if (req.user.role === targetUser.role) {
      return res.status(400).json({
        success: false,
        message: `${req.user.role}s cannot connect with other ${req.user.role}s.`
      });
    }


    const existingConnection = await Connection.findOne({
      $or: [
        { requester: req.user._id, recipient: userId },
        { requester: userId, recipient: req.user._id },
      ],
    });

    if (existingConnection) {
      let message = 'Connection request already exists.';
      if (existingConnection.status === 'accepted') {
        message = 'You are already connected with this user.';
      } else if (existingConnection.status === 'pending') {
        message = 'Connection request already pending.';
      }
      return res.status(409).json({ success: false, message });
    }

    const connection = await Connection.create({
      requester: req.user._id,
      recipient: userId,
      status: 'pending',
    });

    res.status(201).json({ success: true, connection });
  } catch (err) {
    console.error('Send request error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.connectionId);
    if (!connection) {
      return res.status(404).json({ success: false, message: 'Request not found.' });
    }

    if (connection.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    connection.status = 'accepted';
    await connection.save();

    await User.findByIdAndUpdate(
      connection.requester,
      { $addToSet: { connections: connection.recipient } }
    );
    await User.findByIdAndUpdate(
      connection.recipient,
      { $addToSet: { connections: connection.requester } }
    );


    const updatedUser = await User.findById(req.user._id)
      .populate('connections', 'name profilePicture role company');

    res.status(200).json({
      success: true,
      message: 'Connection accepted.',
      connections: updatedUser.connections
    });
  } catch (err) {
    console.error('Accept request error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.connectionId);
    if (!connection) {
      return res.status(404).json({ success: false, message: 'Request not found.' });
    }

    if (connection.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    connection.status = 'rejected';
    await connection.save();

    res.status(200).json({ success: true, message: 'Connection rejected.' });
  } catch (err) {
    console.error('Reject request error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const requests = await Connection.find({
      recipient: req.user._id,
      status: 'pending'
    }).populate('requester', 'name profilePicture role company major');

    res.status(200).json({ success: true, requests });
  } catch (err) {
    console.error('Get pending requests error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const getMyConnections = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('connections', 'name profilePicture role company major email _id');

    const connections = (user.connections || []).filter(conn => conn !== null);

    const expectedRole = user.role === 'alumni' ? 'student' : 'alumni';
    const filtered = connections.filter(conn => conn.role === expectedRole);

    res.status(200).json({ success: true, connections: filtered });
  } catch (err) {
    console.error('Get connections error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const getConnectionStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const connection = await Connection.findOne({
      $or: [
        { requester: req.user._id, recipient: userId },
        { requester: userId, recipient: req.user._id },
      ],
    });

    let status = 'none';
    if (connection) {
      if (connection.status === 'pending') {
        status = connection.requester.toString() === req.user._id.toString()
          ? 'request_sent'
          : 'request_received';
      } else if (connection.status === 'accepted') {
        status = 'connected';
      }
    }

    res.status(200).json({ success: true, status });
  } catch (err) {
    console.error('Get connection status error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};