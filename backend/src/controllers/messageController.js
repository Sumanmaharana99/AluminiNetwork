import { Message } from '../models/Message.js';

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
      .populate('sender', 'name profilePicture')
      .populate('receiver', 'name profilePicture')
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const getInbox = async (req, res) => {
  try {
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [{ sender: myId }, { receiver: myId }],
    })
      .populate('sender', 'name profilePicture role')
      .populate('receiver', 'name profilePicture role')
      .sort({ createdAt: -1 });

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