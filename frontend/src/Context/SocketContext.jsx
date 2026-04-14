import { io } from 'socket.io-client';
import React, { createContext, useContext, useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';

// ─────────────────────────────────────────────────────────────────────────────
// MODULE-LEVEL SINGLETON
// Lives completely outside React — StrictMode double-invoke cannot destroy it.
// ─────────────────────────────────────────────────────────────────────────────
let _socket = null;
let _currentUserId = null;
const _messageListeners = new Set();

function getSocket(token, userId) {
  // Already connected for this exact user — reuse
  if (_socket && _socket.connected && _currentUserId === userId) {
    return _socket;
  }
  // Different user or disconnected — tear down old socket first
  if (_socket) {
    _socket.removeAllListeners();
    _socket.disconnect();
    _socket = null;
    _currentUserId = null;
  }
  _currentUserId = userId;
  _socket = io('http://localhost:5000', {
    auth: { token },
    transports: ['websocket'],
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
  return _socket;
}

function destroySocket() {
  if (_socket) {
    _socket.removeAllListeners();
    _socket.disconnect();
    _socket = null;
    _currentUserId = null;
  }
  _messageListeners.clear();
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────────────────────────────────────
const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  // Tracks whether socket event listeners have been attached for this session
  const listenersAttachedRef = useRef(false);

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated || !user?._id) {
      destroySocket();
      setIsConnected(false);
      setOnlineUsers([]);
      listenersAttachedRef.current = false;
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return;

    const socket = getSocket(token, user._id);

    // ✅ Clean up any previous listeners to prevent duplicates in Strict Mode
    socket.removeAllListeners('connect');
    socket.removeAllListeners('connect_error');
    socket.removeAllListeners('disconnect');
    socket.removeAllListeners('reconnect');
    socket.removeAllListeners('user:online');
    socket.removeAllListeners('users:online');
    socket.removeAllListeners('message:received');

    if (socket.connected) setIsConnected(true);

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
      setIsConnected(true);
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err.message);
      setIsConnected(false);
    });

    socket.on('disconnect', (reason) => {
      console.log('⚠️ Socket disconnected:', reason);
      if (reason === 'io server disconnect') setIsConnected(false);
    });

    socket.on('reconnect', () => setIsConnected(true));

    socket.on('user:online', ({ userId, online }) => {
      setOnlineUsers(prev =>
        online
          ? prev.includes(userId) ? prev : [...prev, userId]
          : prev.filter(id => id !== userId)
      );
    });

    socket.on('users:online', (userIds) => {
      setOnlineUsers(Array.isArray(userIds) ? userIds : []);
    });

    socket.on('message:received', (message) => {
      _messageListeners.forEach(cb => cb(message));
    });

    // ✅ Intentionally NO socket.disconnect() in cleanup.
    // The module-level socket survives StrictMode's mount→unmount→remount.
    return () => {};
  }, [user?._id, isAuthenticated, loading]);

  // ─── Public API ─────────────────────────────────────────────────────────

  const sendMessage = useCallback((receiverId, content) => {
    if (!_socket?.connected) {
      console.error('❌ Socket not connected');
      return false;
    }
    if (!content?.trim()) return false;
    _socket.emit('message:send', { receiverId, content });
    return true;
  }, []);

  const sendTyping = useCallback((receiverId, isTyping) => {
    _socket?.connected && _socket.emit('typing', { receiverId, isTyping });
  }, []);

  // Returns an unsubscribe fn — call in useEffect cleanup
  const onMessageReceived = useCallback((callback) => {
    _messageListeners.add(callback);
    return () => _messageListeners.delete(callback);
  }, []);

  const isUserOnline = useCallback((userId) => onlineUsers.includes(userId), [onlineUsers]);

  // Expose as Set so consumers can call .has()
  const onlineUsersSet = useMemo(() => new Set(onlineUsers), [onlineUsers]);

  return (
    <SocketContext.Provider value={{
      isConnected,
      onlineUsers: onlineUsersSet,
      sendMessage,
      sendTyping,
      onMessageReceived,
      isUserOnline,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);