import { Message } from '../models/Message.js';

// @desc    Get chat history between two users
// @route   GET /api/messages/:userId
// @access  Private
export const getConversation = async (req, res) => {
  try {
    const myId = req.user._id;
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userId },
        { sender: userId, receiver: myId },
      ],
    })
      .populate('sender',   'name profilePicture')
      .populate('receiver', 'name profilePicture')
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Get inbox - list of people you've chatted with
// @route   GET /api/messages
// @access  Private
export const getInbox = async (req, res) => {
  try {
    const myId = req.user._id;

    // Get latest message per conversation
    const messages = await Message.find({
      $or: [{ sender: myId }, { receiver: myId }],
    })
      .populate('sender',   'name profilePicture role')
      .populate('receiver', 'name profilePicture role')
      .sort({ createdAt: -1 });

    // Deduplicate: one entry per conversation partner
    const seen = new Set();
    const inbox = [];
    for (const msg of messages) {
      const partnerId = msg.sender._id.toString() === myId.toString()
        ? msg.receiver._id.toString()
        : msg.sender._id.toString();

      if (!seen.has(partnerId)) {
        seen.add(partnerId);
        inbox.push({
          partner: msg.sender._id.toString() === myId.toString() ? msg.receiver : msg.sender,
          lastMessage: msg.content,
          lastMessageAt: msg.createdAt,
        });
      }
    }

    res.status(200).json({ success: true, inbox });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};