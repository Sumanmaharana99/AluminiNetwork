import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { Message } from '../models/Message.js';

// Track online users: userId -> socketId
const onlineUsers = new Map();

export const initSocket = (io) => {

  // Authenticate socket connection using JWT
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('No token provided'));
    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.userId;
    console.log(`Connected: ${userId}`);

    // Track online status
    onlineUsers.set(userId, socket.id);
    socket.join(userId); // personal room


    io.emit('user:online', { userId, online: true });

    
    socket.on('message:send', async ({ receiverId, content }) => {
      try {
        if (!receiverId || !content?.trim()) return;

        const message = await Message.create({
          sender: userId,
          receiver: receiverId,
          content: content.trim(),
        });

        const populated = await Message.findById(message._id)
          .populate('sender',   'name profilePicture')
          .populate('receiver', 'name profilePicture');

        // Deliver to both sender and receiver
        io.to(userId).emit('message:received', populated);
        io.to(receiverId).emit('message:received', populated);

      } catch (err) {
        console.error('Send message error:', err);
      }
    });

    socket.on('typing', ({ receiverId, isTyping }) => {
      io.to(receiverId).emit('typing', { senderId: userId, isTyping });
    });

  
    socket.on('disconnect', () => {
      onlineUsers.delete(userId);
      io.emit('user:online', { userId, online: false });
      console.log(` Disconnected: ${userId}`);
    });
  });
};