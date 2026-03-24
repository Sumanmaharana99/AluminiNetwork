import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../Context/AuthContext';

export const useSocket = () => {
  const { user, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [typingUsers, setTypingUsers] = useState(new Map());
  const socketRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const token = localStorage.getItem('token');
    const newSocket = io('/', {
      auth: { token },
      transports: ['websocket'],
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('user:online', ({ userId, online }) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        if (online) {
          newSet.add(userId);
        } else {
          newSet.delete(userId);
        }
        return newSet;
      });
    });

    newSocket.on('typing', ({ senderId, isTyping }) => {
      setTypingUsers(prev => {
        const newMap = new Map(prev);
        if (isTyping) {
          newMap.set(senderId, true);
        } else {
          newMap.delete(senderId);
        }
        return newMap;
      });

      // Clear typing indicator after 3 seconds
      setTimeout(() => {
        setTypingUsers(prev => {
          const newMap = new Map(prev);
          newMap.delete(senderId);
          return newMap;
        });
      }, 3000);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user, isAuthenticated]);

  const sendMessage = (receiverId, content) => {
    if (socketRef.current && content?.trim()) {
      socketRef.current.emit('message:send', { receiverId, content });
    }
  };

  const sendTyping = (receiverId, isTyping) => {
    if (socketRef.current) {
      socketRef.current.emit('typing', { receiverId, isTyping });
    }
  };

  const onMessageReceived = (callback) => {
    if (socketRef.current) {
      socketRef.current.on('message:received', callback);
      return () => socketRef.current.off('message:received');
    }
    return () => {};
  };

  return {
    socket,
    onlineUsers,
    typingUsers,
    sendMessage,
    sendTyping,
    onMessageReceived,
    isUserOnline: (userId) => onlineUsers.has(userId),
    isUserTyping: (userId) => typingUsers.has(userId),
  };
};