import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Chat = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState("");
    
    // Dummy data - students who are connected with this alumni
    const [students] = useState([
        { id: 1, name: "John Doe", branch: "CSE", year: "3rd", lastMessage: "Thank you for the referral!", time: "10:30 AM", unread: 2 },
        { id: 2, name: "Sarah Smith", branch: "IT", year: "4th", lastMessage: "When is the interview?", time: "Yesterday", unread: 0 },
        { id: 3, name: "Rahul Sharma", branch: "ECE", year: "3rd", lastMessage: "I've submitted my resume", time: "Yesterday", unread: 1 },
        { id: 4, name: "Priya Patel", branch: "CSE", year: "4th", lastMessage: "Thanks for your guidance", time: "2 days ago", unread: 0 },
    ]);

    // Dummy messages for selected student
    const [messages, setMessages] = useState([
        { id: 1, sender: "student", text: "Hello sir, thank you for accepting my connection request!", time: "10:00 AM" },
        { id: 2, sender: "alumni", text: "Hi John, happy to help! How can I assist you?", time: "10:15 AM" },
        { id: 3, sender: "student", text: "I have an interview at Google next week. Any tips?", time: "10:20 AM" },
        { id: 4, sender: "alumni", text: "Sure! Focus on DSA and system design. I can share some resources.", time: "10:25 AM" },
        { id: 5, sender: "student", text: "Thank you for the referral!", time: "10:30 AM" },
    ]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const newMsg = {
                id: messages.length + 1,
                sender: "alumni",
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMsg]);
            setMessage("");
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Alumni Portal</h2>
                </div>
        <nav className="p-4 space-y-2">
    <Link to="/alumni/dashboard" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
    <Link to="/alumni/profile" className="block p-3 hover:bg-gray-100 rounded">Profile</Link>
    <Link to="/alumni/requests" className="block p-3 hover:bg-gray-100 rounded">Requests</Link>
    <Link to="/alumni/events" className="block p-3 hover:bg-gray-100 rounded">Post Events</Link>
    <Link to="/alumni/chat" className="block p-3 bg-blue-100 rounded">Chat</Link>
    <Link to="/" className="block p-3 hover:bg-gray-100 rounded mt-20">Logout</Link>
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
                        {students.map(student => (
                            <div 
                                key={student.id}
                                onClick={() => setSelectedStudent(student)}
                                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedStudent?.id === student.id ? 'bg-blue-50' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start space-x-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="font-bold text-blue-600">{student.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{student.name}</h3>
                                            <p className="text-xs text-gray-500">{student.branch} • {student.year}</p>
                                            <p className="text-sm text-gray-600 mt-1 truncate w-40">{student.lastMessage}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">{student.time}</p>
                                        {student.unread > 0 && (
                                            <span className="inline-block mt-1 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                                {student.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white">
                    {selectedStudent ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                                    <span className="text-white font-bold">{selectedStudent.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h2 className="font-bold">{selectedStudent.name}</h2>
                                    <p className="text-xs text-gray-500">{selectedStudent.branch} • {selectedStudent.year}</p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map(msg => (
                                    <div 
                                        key={msg.id} 
                                        className={`flex ${msg.sender === 'alumni' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div 
                                            className={`max-w-md p-3 rounded-lg ${
                                                msg.sender === 'alumni' 
                                                    ? 'bg-blue-600 text-white rounded-br-none' 
                                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                            }`}
                                        >
                                            <p>{msg.text}</p>
                                            <p className={`text-xs mt-1 ${msg.sender === 'alumni' ? 'text-blue-100' : 'text-gray-500'}`}>
                                                {msg.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <form onSubmit={sendMessage} className="p-4 border-t">
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
    )
}

export default Chat