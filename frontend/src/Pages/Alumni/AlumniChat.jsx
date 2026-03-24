import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useSocket } from '../../hooks/useSocket';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const AlumniChat = () => {
    const { userId } = useParams();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState("");
    const [students, setStudents] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    
    const { sendMessage, onMessageReceived, onlineUsers } = useSocket();

    useEffect(() => {
        fetchConnectedStudents();
        
        // Listen for new messages
        const unsubscribe = onMessageReceived((newMessage) => {
            if (selectedStudent && newMessage.sender._id === selectedStudent._id) {
                setMessages(prev => [...prev, newMessage]);
            }
        });
        
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (userId && students.length > 0) {
            const student = students.find(s => s._id === userId);
            if (student) {
                setSelectedStudent(student);
                fetchMessages(userId);
            }
        }
    }, [userId, students]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchConnectedStudents = async () => {
        try {
            const response = await api.get('/connections');
            const connections = response.data.connections || [];
            setStudents(connections);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching connections:', error);
            toast.error('Failed to load connections');
            setLoading(false);
        }
    };

    const fetchMessages = async (studentId) => {
        try {
            const response = await api.get(`/messages/${studentId}`);
            setMessages(response.data.messages || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Failed to load messages');
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && selectedStudent) {
            sendMessage(selectedStudent._id, message);
            setMessage("");
        }
    };

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        fetchMessages(student._id);
        navigate(`/alumni/chat/${student._id}`, { replace: true });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">Loading chat...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Alumni Portal</h2>
                    <p className="text-sm text-gray-600 mt-1">{user?.name}</p>
                </div>
                <nav className="p-4">
                    <Link to="/alumni/dashboard" className="block p-2 mb-2 hover:bg-gray-100 rounded">Dashboard</Link>
                    <Link to="/alumni/profile" className="block p-2 mb-2 hover:bg-gray-100 rounded">Profile</Link>
                    <Link to="/alumni/requests" className="block p-2 mb-2 hover:bg-gray-100 rounded">Requests</Link>
                    <Link to="/alumni/events" className="block p-2 mb-2 hover:bg-gray-100 rounded">Events</Link>
                    <Link to="/alumni/chat" className="block p-2 mb-2 bg-blue-100 rounded">Chat</Link>
                    <button 
                        onClick={handleLogout}
                        className="block w-full text-left p-2 mt-20 hover:bg-gray-100 rounded text-red-600"
                    >
                        Logout
                    </button>
                </nav>
            </div>

            {/* Chat Container */}
            <div className="flex-1 flex">
                {/* Students List */}
                <div className="w-80 bg-white border-r">
                    <div className="p-4 border-b">
                        <h2 className="font-bold">Connected Students</h2>
                        <p className="text-sm text-gray-500 mt-1">{students.length} connections</p>
                    </div>
                    
                    <div className="overflow-y-auto h-[calc(100vh-120px)]">
                        {students.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                No connections yet
                            </div>
                        ) : (
                            students.map(student => (
                                <div 
                                    key={student._id}
                                    onClick={() => handleSelectStudent(student)}
                                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                                        selectedStudent?._id === student._id ? 'bg-blue-50' : ''
                                    }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-start space-x-3">
                                            {student.profilePicture ? (
                                                <img 
                                                    src={student.profilePicture} 
                                                    alt={student.name}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="font-bold text-blue-600">
                                                        {student.name?.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-semibold">{student.name}</h3>
                                                <p className="text-xs text-gray-500 capitalize">{student.role}</p>
                                                {student.major && (
                                                    <p className="text-xs text-gray-500">{student.major}</p>
                                                )}
                                            </div>
                                        </div>
                                        {onlineUsers.has(student._id) && (
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white">
                    {selectedStudent ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b flex items-center space-x-3">
                                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                        {selectedStudent.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg">{selectedStudent.name}</h2>
                                    <p className="text-sm text-gray-500">
                                        {onlineUsers.has(selectedStudent._id) ? 'Online' : 'Offline'}
                                    </p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.length === 0 ? (
                                    <div className="text-center text-gray-500 py-8">
                                        No messages yet. Start a conversation!
                                    </div>
                                ) : (
                                    messages.map(msg => (
                                        <div 
                                            key={msg._id} 
                                            className={`flex ${msg.sender._id === user?._id ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div 
                                                className={`max-w-md p-3 rounded-lg ${
                                                    msg.sender._id === user?._id 
                                                        ? 'bg-blue-600 text-white rounded-br-none' 
                                                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                                }`}
                                            >
                                                <p>{msg.content}</p>
                                                <p className={`text-xs mt-1 ${
                                                    msg.sender._id === user?._id ? 'text-blue-100' : 'text-gray-500'
                                                }`}>
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { 
                                                        hour: '2-digit', 
                                                        minute: '2-digit' 
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <form onSubmit={handleSendMessage} className="p-4 border-t">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <button 
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            <div className="text-center">
                                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p className="text-lg">Select a student to start chatting</p>
                                <p className="text-sm mt-2">You have {students.length} connected students</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlumniChat;