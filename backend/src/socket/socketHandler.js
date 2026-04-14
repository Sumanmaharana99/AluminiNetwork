import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { Message } from '../models/Message.js';

const onlineUsers = new Map();

export const initSocket = (io) => {


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
    console.log(`Connected: ${userId} (socket: ${socket.id})`);


    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);

    socket.join(userId);


    io.emit('user:online', { userId, online: true });


    const currentOnline = Array.from(onlineUsers.keys());
    socket.emit('users:online', currentOnline);


    socket.on('message:send', async ({ receiverId, content }) => {
      try {
        if (!receiverId || !content?.trim()) return;

        const message = await Message.create({
          sender: userId,
          receiver: receiverId,
          content: content.trim(),
        });

        const populated = await Message.findById(message._id)
          .populate('sender', 'name profilePicture')
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
      const sockets = onlineUsers.get(userId);
      if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          onlineUsers.delete(userId);
          io.emit('user:online', { userId, online: false });
          console.log(`Disconnected (offline): ${userId}`);
        } else {
          console.log(`Disconnected (still online, ${sockets.size} remaining): ${userId}`);
        }
      }
    });
  });
};